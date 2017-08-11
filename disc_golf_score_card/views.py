import requests
from flask.views import MethodView
import flask
import json

from helpers import classproperty
import models
import forms

class IndexView(MethodView):
    def get(self):
        return flask.redirect('/app')
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
            #print self.request.json
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
     
    def get(self, obj_id=None):
        if obj_id is not None:
            return self.json(self.model.query.get(obj_id).json)
        return self.json(map(lambda x: x.json, self.model.query.all()))

class BaseRemoveView(BaseModelView):
    def __init__(self, *args, **kwargs):
        super(BaseRemoveView, self).__init__(*args, **kwargs)
        self.request = flask.request
    
    def delete(self, obj_id=None):
        itm = self._model.query.get(obj_id)
        itm.delete()
        response = flask.make_response(json.dumps(dict(result='success')))
        response.headers['Content-Type'] = 'application/json'
        return response

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
        _form = self.__class__._form_class(**self.request.json)
        new_model = self.__class__.model(**_form.data).save()
        if new_model.id:
            rtn = dict(success=True, error=None, result=new_model.json)

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
  
from json import JSONEncoder
class ModelEncoder(JSONEncoder):
    def default(self, o):
        try:
            return o.json
        except Exception as e:
            #raise e
            return super(ModelEncoder, self).default(o)

class GameView(BaseListView):
    _model = models.DiscGolfGame

    def get(self, game_id=None):
        games = models.DiscGolfGame.query.filter(self._model.course != None) if game_id is None else [models.DiscGolfGame.query.get(game_id)]
        scores = filter(None,[
            dict(
                scores=models.DiscGolfGamePlayerScore.get_scores_for_game(game), 
                date=game.date.strftime('%Y-%m-%dT%H:%I:%S%Z'), 
                course=game.course.location,
                winner=game.winner,
            ) for game in games                          
        ])
        # print scores
        rtn = json.dumps(scores)
        response = flask.make_response(rtn)
        response.headers['Content-Type'] = 'application/json'
        return response


def generate_game_data(game):
    #game = models.DiscGolfGame.query.get(game_id)
    # if game.course is None or game.players.count() == 0:
    #     return
    # score_card = game.score_card
    # rtn = dict(
    #     date=game.date.strftime('%Y-%m-%dT%H:%I:%S%Z'),
    #     course=dict(
    #         name=game.course.name,
    #         location=game.course.location,
    #     ),
    # )
    # scores = {
    #     name: [] for name in map(lambda x: x.name, game.players.query.all())
    # }
    # for hole in game.course.holes.all():
    #     for player in scores.keys():
    #         scores[player].append(
    #             models.DiscGolfGamePlayerScore.query.filter_by(
    #                 score_card=game.score_card,
    #                 player=player,
    #             )
    #         )
        # holes=[
        #     dict(
        #         number=hole.number, 
        #         players=[
        #             dict(
        #                 name=player.name, 
        #                 value=models.DiscGolfGamePlayerScore.get_player_score(hole, player, game)
        #             ) for player in game.players.all()
        #     ]) for hole in game.course.holes.all()
        # ]
    #)
    #return scores
    return game.scores

class PlayerView(BaseListView, BaseAddView, BaseRemoveView):
    _model = models.DiscGolfPlayer
    _form_class = forms.AddPlayerForm

    def get(self, *args, **kwargs):
        return super(PlayerView, self).get(*args, **kwargs)

    def post(self, *args, **kwargs):
        return super(PlayerView, self).post(*args, **kwargs)

    def delete(self, *args, **kwargs):
        return super(PlayerView, self).delete(*args, **kwargs)


class FrisbeeView(BaseAddView, BaseListView):
    _model = models.DiscGolfFrisbee
    _form_class = forms.AddFrisbeeForm

    def get(self, *args, **kwargs):
        return super(FrisbeeView, self).get(*args, **kwargs)

    def post(self, *args, **kwargs):
        return super(FrisbeeView, self).post(*args, **kwargs)

class CourseView(BaseAddView, BaseListView, BaseRemoveView):
    _model = models.DiscGolfCourse
    _form_class = forms.AddCourseForm

    def get(self, obj_id=None):
        return super(CourseView, self).get(obj_id=obj_id)

    def post(self, *args, **kwargs):
        return super(CourseView, self).post(*args, **kwargs)

    def delete(self, *args, **kwargs):
        return super(CourseView, self).delete(*args, **kwargs)

