import os

import flask
import json

import views
import models

try:
    import psycopg2
    use_sqlite = False
except ImportError:
    use_sqlite = True

app = flask.Flask(
    __name__, 
    template_folder='./dist',
    static_folder='./dist', 
    static_url_path='/dist'
)

app.config.SECRET_KEY = 'secret'
app.config.SQLALCHEMY_URI = os.environ.get('DATABASE_URL')#os.environ.get('SQLALCHEMY_URI',False) or ('sqlite:///my.db' if use_sqlite else 'postgresql://dgsc:dgsc@localhost:5432/dgsc2')
app.config.SQLALCHEMY_ECHO = True


app.add_url_rule('/', 'index', view_func=views.IndexView.as_view('index'))
app.add_url_rule('/game/', view_func=views.GameView.as_view('game'))
app.add_url_rule('/api/player/', view_func=views.PlayerView.as_view('player'))
app.add_url_rule('/api/player/<int:obj_id>', view_func=views.PlayerView.as_view('player_id'))
app.add_url_rule('/course/', view_func=views.CourseView.as_view('course'))
app.add_url_rule('/course/<int:obj_id>', view_func=views.CourseView.as_view('course_id'))
app.add_url_rule('/frisbee/', view_func=views.FrisbeeView.as_view('frisbee'))
app.add_url_rule('/frisbee/<int:obj_id>', view_func=views.FrisbeeView.as_view('frisbee_id'))
app.add_url_rule('/api/game/add', view_func=views.AddNewGameView.as_view('add_game'))
app.add_url_rule('/api/add_score/<int:score_card_id>/<int:hole_id>/<int:player_id>',view_func=views.AddHoleScoreView.as_view('add_score'))
app.add_url_rule('/app', 'app', view_func=views.SendFileView.as_view('send_file'))
app.add_url_rule('/app/<path:stuff>', 'app_stuff', view_func=views.SendFileView.as_view('send_more'))

if __name__ == '__main__':
    if os.environ.get('CREATE_TABLES'):
        with app.app_context():
            #if not has_db():
            #    create_tables()
            pass
    app.debug = True
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT',8090)), debug=True)
