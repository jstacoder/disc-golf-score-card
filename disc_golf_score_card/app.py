import os

import flask
import json

import views
import models

app = flask.Flask(
    __name__, 
    template_folder='./dist',
    static_folder='./dist', 
    static_url_path='/dist'
)

app.config.SECRET_KEY = 'secret'
app.config.SQLALCHEMY_URI = 'sqlite:///my.db'
app.config.SQLALCHEMY_ECHO = True


app.add_url_rule('/', 'index', view_func=views.IndexView.as_view('index'))
app.add_url_rule('/game/', view_func=views.GameView.as_view('game'))
app.add_url_rule('/player/', view_func=views.PlayerView.as_view('player'))
app.add_url_rule('/course/', view_func=views.CourseView.as_view('course'))
app.add_url_rule('/course/<int:obj_id>', view_func=views.CourseView.as_view('course_id'))
app.add_url_rule('/frisbee/', view_func=views.FrisbeeView.as_view('frisbee'))
app.add_url_rule('/frisbee/<int:obj_id>', view_func=views.FrisbeeView.as_view('frisbee_id'))

with app.test_request_context():
    app.add_url_rule('/app', 'app', view_func=lambda: flask.redirect(flask.url_for('index')))
    app.add_url_rule('/app/<path:stuff>', 'app_stuff', view_func=lambda stuff=None: flask.redirect(flask.url_for('index')))

if __name__ == '__main__':
    if os.environ.get('CREATE_TABLES'):
        with app.app_context():
            #if not has_db():
            #    create_tables()
            pass
    app.debug = True
    app.run(host='0.0.0.0', port=8090, debug=True)
