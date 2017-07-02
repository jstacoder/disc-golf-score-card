import sqlalchemy as sa 
from sqlalchemy.ext.declarative import declarative_base, declared_attr

from inflection import underscore, pluralize

from flask import current_app

cls_registry = dict()

engine = lambda: sa.create_engine(current_app.config.SQLALCHEMY_URI, echo=current_app.config.SQLALCHEMY_ECHO)
session = lambda engine: sa.orm.scoped_session(
    sa.orm.sessionmaker(bind=engine)
)

class classproperty(object):
    def __init__(self, instance):
        self.getter = instance
    
    def __get__(self, instance, owner):
        return self.getter(owner)

class BaseModel(object):
    _engine = None
    _session = None
    _query = None

    @classproperty
    def engine(cls):
        if cls._engine is None:
            cls._engine = engine()
            if cls.metadata.bind is None:
                cls.metadata.bind = cls._engine
        return cls._engine

    @classproperty
    def session(cls):
        if cls._session is None:
            cls._session = session(cls.engine)()
        return cls._session

    @classproperty
    def query(cls):
        return cls.session.query(cls)

    @declared_attr
    def __tablename__(self):
        return underscore(pluralize(self.__name__))
    
    @declared_attr
    def id(self):
        return sa.Column(sa.Integer, primary_key=True)

    def save(self, *args, **kwargs):
        self.session.add(self)
        self.session.commit()
        return self

    @classmethod
    def _get_all(cls):
        return cls.query.all()

    def get_all(self):
        return self.__class__._get_all()
        

Model = declarative_base(cls=BaseModel, class_registry=cls_registry)

class User(Model):
    name = sa.Column(sa.String(255), nullable=False)

class DiscGolfCourse(Model):
    name = sa.Column(sa.String(255), nullable=False)
    location = sa.Column(sa.String(255))
    holes = sa.orm.relation(
        'DiscGolfHole', 
        backref=sa.orm.backref(
            'course', 
            uselist=False
        ), 
        lazy='dynamic'
    )
    
class DiscGolfFrisbee(Model):
    brand = sa.Column(sa.String(255), nullable=False)
    name =  sa.Column(sa.String(255), nullable=False)
    disc_type = sa.Column(sa.String(255))

class DiscGolfGame(Model):
    date = sa.Column(sa.Date, default=sa.func.now())
    course = sa.orm.relation(
        'DiscGolfCourse',
        uselist=False, 
        backref=sa.orm.backref('games', lazy='dynamic')
    )
    course_id = sa.Column(sa.Integer, sa.ForeignKey('disc_golf_courses.id'))

class DiscGolfHole(Model):
    par = sa.Column(sa.Integer, nullable=False, default=3)
    course_id = sa.Column(sa.Integer, sa.ForeignKey('disc_golf_courses.id'))

class DiscGolfScoreCard(Model):
    game = sa.orm.relation('DiscGolfGame', uselist=False)
    game_id = sa.Column(sa.Integer, sa.ForeignKey('disc_golf_games.id'))
    course = sa.orm.relation('DiscGolfCourse', uselist=False)
    course_id = sa.Column(sa.Integer, sa.ForeignKey('disc_golf_courses.id'))
    players = sa.orm.relation('DiscGolfPlayer', secondary='players_score_cards',backref='score_cards')

class DiscGolfPlayer(Model):
    name = sa.Column(sa.String(255))
    games = sa.orm.relation('DiscGolfGame', secondary='players_games',backref='games')


players_score_cards = sa.Table(
    'players_score_cards', Model.metadata,
    sa.Column('players_id',sa.Integer,sa.ForeignKey('disc_golf_players.id')),
    sa.Column('score_cards_id', sa.Integer, sa.ForeignKey('disc_golf_score_cards.id'))
)    

players_games = sa.Table(
    'players_games', Model.metadata,
    sa.Column('players_id',sa.Integer,sa.ForeignKey('disc_golf_players.id')),
    sa.Column('games_id', sa.Integer, sa.ForeignKey('disc_golf_games.id'))
)

class MyDb(Model):
    created = sa.Column(sa.Boolean, default=True)

def has_db():
    pass

def create_tables():
    from flask import Flask
    app = Flask(__name__)
    app.config.SQLALCHEMY_URI = 'sqlite:///my.db'
    app.config.SQLALCHEMY_ECHO = True
    with app.app_context():
        has_db = False
        try:
            db_count = MyDb.query.all().count()
            has_db = True
        except:
            pass
        if not has_db:
            Model.metadata.bind = Model.engine
            Model.metadata.create_all()
            db = MyDb(created=1).save()

if __name__ == "__main__":
    create_tables()
