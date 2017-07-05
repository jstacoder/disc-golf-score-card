from flask.views import MethodView
import flask
import json

from helpers import classproperty
import models
import forms

class IndexView(MethodView):
    def get(self):
        return flask.render_template('index.html')
    
    def post(self):
        return flask.make_response('{}')

class BaseModelView(MethodView):
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


class PlayerView(BaseListView):
    _model = models.DiscGolfPlayer

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
        

