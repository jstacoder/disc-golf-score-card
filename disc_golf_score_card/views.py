import requests
from flask.views import MethodView
import flask
import json

from helpers import classproperty
import models
import forms

class IndexView(MethodView):
    def get(self):
        return flask.redirect(flask.url_for('app'))
    
    def post(self):
        return flask.make_response('{}')

class SendFileView(MethodView):
    def get(self, stuff=None):
        try:
            response = flask.send_file('dist/index.html')
        except IOError:
            response = flask.make_response(requests.get('http://localhost:3000/dist/index.html').content)
        return response

class BaseView(MethodView):
    _context = {}

    def __init__(self, *args, **kwargs):
        super(BaseView, self).__init__(*args, **kwargs)
        self.request = flask.request

    def add_to_context(self, key, val):
        ctx = self.get_context()
        ctx[key] = val
        self._context = ctx
        return self._context

    def get_context(self):
        return self._context

class AddHoleScoreView(BaseView):
    def post(self, score_card_id=None,  hole_id=None, player_id=None):
        try:
            value = self.request.json['value']
        except Exception as e:
            print self.request.json
            raise e
        models.add_score(hole_id, player_id, score_card_id, value)
        rtn = flask.make_response(json.dumps({'result':'success'}))
        rtn.headers['Content-Type'] = 'application/json'
        return rtn

class BaseModelView(BaseView):
    _model = None
    _routes_added = False
    _routes_to_add = None

    @classproperty
    def model(cls):
        if cls._model is None:
            raise NotImplementedError
        return cls._model

    @property
    def self_model(self):
        return self.__class__.model

    @self_model.setter
    def self_model(self, val):
        self.__class__._model = model


    def __init__(self, model=None, *args, **kwargs):
        if model is not None:
            self.self_model = model
        super(BaseModelView, self).__init__(*args, **kwargs)

    def json(self, data):
        _json = json.dumps(data)
        response = flask.make_response(_json)
        response.headers['Content-Type'] = 'application/json'
        return response

class AddNewGameView(BaseModelView):
    _model = models.DiscGolfGame
    _form_class = forms.AddGameForm

    def __init__(self, *args, **kwargs):
        super(AddNewGameView, self).__init__(*args, **kwargs)
        self._form_class.course.choices = models.DiscGolfCourse\
                    .query\
                    .filter(models.DiscGolfCourse.name.like("%"))\
                    .values('id','name')
        
        self._form_class.players.choices = models.DiscGolfPlayer\
                  .query\
                  .filter(models.DiscGolfPlayer.name.like("%"))\
                  .values('id', 'name')
        

    def post(self):
        #ipdb.set_trace()
        form = self._form_class(**self.request.json)
        
        course = models.DiscGolfCourse.query.get(form.course.data)
        game = self.model(course=course).save()
        sc = models.DiscGolfScoreCard(game=game).save()
        first_hole = course.holes.first()
        players = map(lambda x: models.DiscGolfPlayer.query.get(x), form.players.data)
        for p in players:
            p.games.append(game)
            p.save()
        return self.json(dict(score_card=sc.id, game=game.id, first_hole_id=first_hole.id))

class BaseListView(BaseModelView):
    def __init__(self, *args, **kwargs):        
        super(BaseListView, self).__init__(*args, **kwargs)        

    @classmethod
    def _add_routes(cls, app):    

        app.add_url_rule(
            '/list/{}'.format(
                cls.model.__name__.lower()
            ),
            view_func=cls.as_view(
            'list_{}'.format(cls.model.__name__.lower())
            )
        )
        app.add_url_rule(
            '/list/{}/<int:obj_id>'.format(
                cls.model.__name__.lower()
            ),
            view_func=cls.as_view(
            'view_{}'.format(cls.model.__name__.lower())
            )
        )        
        # for c in cls.mro():
            #     if hasattr(c, '_add_routes') and hasattr(c, '_model') and callable(getattr(c, '_add_routes')):
            #         getattr(c, '_add_routes')(app)
            

    def get(self, obj_id=None):
        if obj_id is not None:
            return self.json(self.model.query.get(obj_id).json)
        return self.json(map(lambda x: x.json, self.model.query.all()))

class BaseAddView(BaseModelView):
    _form_args = {}
    _form_class = None
    _form = None

    def __init__(self, form_class=None, *args, **kwargs):
        super(BaseAddView, self).__init__(*args, **kwargs)
        self.request = flask.request
        self._form_class = form_class
    
    @classmethod
    def add_form_arg(cls, key, val):
        cls._form_args[key] = val

    @property
    def form(self):
        if self._form is None:
            self._form = self._form_class(**self._form_args)

    def post(self, obj_id=None):
        print self.request.form
        print self.request.data
        print self.request.json
        print self.request.args

        _form = self.__class__._form_class(**self.request.json)
        new_model = self.__class__.model(**_form.data).save()
        if new_model.id:
            rtn = dict(success=True, error=None)
        else:
            rtn = dict(success=False, error='could not create new model')
        rtn = flask.make_response(json.dumps(rtn))
        rtn.headers = rtn.headers if hasattr(rtn, 'headers') else {}
        rtn.headers['Content-Type'] = 'application/json'
        return rtn
        #for item in flask.request._get_current_objectadd
    
    @classmethod
    def _add_routes(cls, app):   
    
        app.add_url_rule(
            '/add/{}'.format(
                cls.model.__name__.lower()
            ), 
            view_func=cls.as_view(
                'add_{}'.format(
                    cls.model.__name__.lower()
                )
            )
        )
        # for c in cls.mro():
            #     if hasattr(c, '_add_routes') and hasattr(c, '_model') and callable(getattr(c, '_add_routes')):
            #         getattr(c, '_add_routes')(app)

class GameView(BaseListView):
    _model = models.DiscGolfGame

class PlayerView(BaseListView, BaseAddView):
    _model = models.DiscGolfPlayer
    _form_class = forms.AddPlayerForm

    def get(self, *args, **kwargs):
        return super(PlayerView, self).get(*args, **kwargs)

    def post(self, *args, **kwargs):
        return super(PlayerView, self).post(*args, **kwargs)


class FrisbeeView(BaseAddView, BaseListView):
    _model = models.DiscGolfFrisbee
    _form_class = forms.AddFrisbeeForm

    def get(self, *args, **kwargs):
        return super(FrisbeeView, self).get(*args, **kwargs)

    def post(self, *args, **kwargs):
        return super(FrisbeeView, self).post(*args, **kwargs)

class CourseView(BaseAddView, BaseListView):
    _model = models.DiscGolfCourse
    _form_class = forms.AddCourseForm

    def get(self, obj_id=None):
        return super(CourseView, self).get(obj_id=obj_id)

    def post(self, *args, **kwargs):
        return super(CourseView, self).post(*args, **kwargs)
        

