import os

import flask
import json
from flask.views import MethodView

from . import models

app = flask.Flask(__name__, template_folder='dist',static_folder='./dist', static_url_path='/dist')

app.config.SECRET_KEY = 'secret'
app.config.SQLALCHEMY_URI = 'sqlite:///my.db'
app.config.SQLALCHEMY_ECHO = True

class IndexView(MethodView):
    def get(self):
        return flask.render_template('index.html')
    
    def post(self):
        return flask.make_response('{}')

class BaseModelView(MethodView):
    _model = None

    @models.classproperty
    def model(cls):
        if cls._model is None:
            raise NotImplementedError
        return cls._model

    @classmethod
    def _add_routes(cls, app):
        pass

    def __init__(self, model=None, *args, **kwargs):
        if model is not None:
            self.__class__._model = model
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
        super(BaseListView, cls)._add_routes(app)
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
            return self.json(self.model.query.filter(id=obj_id))
        return self.json(self.model.query.all())

class BaseAddView(BaseModelView):
    _form_args = {}
    _form_class = None
    _form = None

    def __init__(self, form_class, *args, **kwargs):
        super(BaseAddView, self).__init__(*args, **kwars)
        self._form_class = form_class
    
    @classmethod
    def add_form_arg(cls, key, val):
        cls._form_args[key] = val

    @property
    def form(self):
        if self._form is None:
            self._form = self._form_class(**self._form_args)

    def get(self):
        raise Exception('no access')

    def post(self):
        pass
        #for item in flask.request._get_current_object

class GameView(BaseListView):
    _model = models.DiscGolfGame

app.add_url_rule('/', 'index', view_func=IndexView.as_view('index'))
GameView._add_routes(app)


if __name__ == '__main__':
    if os.environ.get('CREATE_TABLES'):
        with app.app_context():
            if not has_db():
                create_tables()
    app.debug = True
    app.run(host='0.0.0.0', port=8080, debug=True)
