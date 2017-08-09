from datetime import datetime as dt

import sqlalchemy as sa 
from sqlalchemy.ext.declarative import declarative_base, declared_attr

from inflection import underscore, pluralize, humanize

from werkzeug import import_string, cached_property

from flask import current_app

from helpers import classproperty

cls_registry = dict()

engine = lambda: sa.create_engine(current_app.config.SQLALCHEMY_URI, echo=current_app.config.SQLALCHEMY_ECHO)
session = lambda engine: sa.orm.scoped_session(
    sa.orm.sessionmaker(bind=engine)
)

class BaseModel(object):
    _engine = None
    _session = None
    _query = None

    @property
    def json(self):
        raise NotImplementedError

    @classproperty
    def engine(cls):
        if cls._engine is None:
            cls._engine = engine()
            if cls.metadata.bind is None:
                cls.metadata.bind = cls._engine
        return cls._engine

    @classproperty
    def session(cls):
        if BaseModel._session is None:
            BaseModel._session = session(cls.engine)()
        return BaseModel._session

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
        self.__class__.session.add(self)
        self.__class__.session.commit()
        return self

    def delete(self):
        self.__class__.session.delete(self)
        self.__class__.session.commit()

    @classmethod
    def _get_all(cls):
        return cls.query.all()

    def get_all(self):
        return self.__class__._get_all()

    @property
    def display_name(self):
        return humanize(getattr(self, 'name', self.__class__.__name__)).title()
        
convention = {
  "ix": 'ix_%(column_0_label)s',
  "uq": "uq_%(table_name)s_%(column_0_name)s",
  "ck": "ck_%(table_name)s_%(constraint_name)s",
  "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
  "pk": "pk_%(table_name)s"
}

metadata = sa.MetaData(naming_convention=convention)

Model = declarative_base(cls=BaseModel, metadata=metadata, class_registry=cls_registry)

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

    def __init__(self, *args, **kwargs):            
        num_of_holes = kwargs.pop('number_of_holes', None)
        if num_of_holes is None:
            num_of_holes = False    
        super(DiscGolfCourse, self).__init__(*args, **kwargs)
        if num_of_holes and int(num_of_holes):
            for _ in xrange(int(num_of_holes)):
                hole = DiscGolfHole(par=3, number=_+1).save()
                self.holes.append(hole)
            self.save()

    @cached_property
    def json(self):
        return dict(
            id=self.id,
            name=self.name,
            location=self.location,
            holes=map(
                lambda hole:hole.json, self.holes.all()
            ),
            hole_count=self.holes.count(),
            display_name=self.display_name,
        )
    
class DiscGolfFrisbee(Model):
    PUTTER_TYPE = 'putter'
    SHORT_RANGE_TYPE = 'short-range-driver'
    MID_RANGE_TYPE = 'mid-range-driver'
    LONG_RANGE_TYPE = 'long-range-driver'

    DISC_TYPES = [
        PUTTER_TYPE,
        SHORT_RANGE_TYPE,
        MID_RANGE_TYPE,
        LONG_RANGE_TYPE,
    ]

    brand = sa.Column(sa.String(255), nullable=False)
    name =  sa.Column(sa.String(255), nullable=False)
    disc_type = sa.Column(sa.String(255))

    @cached_property
    def json(self):
        return dict(
        brand=self.brand,
        name=self.name,
        disc_type=self.disc_type,
    )

class DiscGolfGame(Model):
    complete = sa.Column(sa.Boolean, default=False)
    complete_date = sa.Column(sa.DateTime)
    date = sa.Column(sa.Date, default=sa.func.now())
    course = sa.orm.relation(
        'DiscGolfCourse',
        uselist=False, 
        backref=sa.orm.backref('games', lazy='dynamic')
    )
    course_id = sa.Column(sa.Integer, sa.ForeignKey('disc_golf_courses.id'))

    @property
    def scores(self):
        return [
            (player.name, player.get_scores_for_game(self))
            for player in self.players.all()
        ]

    def has_complete_score_card(self):
        players = self.players.all()
        scores = {}
        score_card = self.score_card

        for player in players:
            scores[player.id] = DiscGolfGamePlayerScore.query.filter_by(player=player, score_card=score_card).all()
        return any(map(lambda x: (len(x) >= self.course.holes.count()) if self.course is not None else False, scores.values()))

    @staticmethod
    def complete_game(game):
        game.complete = True
        game.complete_date = dt.now()
        return game.save()        

    @cached_property
    def json(self):
        if self.course:
            return dict(
                date=self.date.strftime('%Y-%m-%dT%H:%I:%S%Z'),
                course=self.course.name,
                id=self.id,
                complete=self.complete
            )
    
    @classproperty
    def has_incomplete_games(cls):
        return any(filter(lambda x: not x.complete, cls._get_all()))
    
    def get_scores(self):
        return {
            player.name: player.get_scores_from_game(self)
            for player in self.players.all()
        }


class DiscGolfHole(Model):
    par = sa.Column(sa.Integer, nullable=False, default=3)
    number = sa.Column(sa.Integer, nullable=False)
    course_id = sa.Column(sa.Integer, sa.ForeignKey('disc_golf_courses.id'))

    def __init__(self, *args, **kwargs):
        if 'number' not in kwargs:
            kwargs['number'] = self.__class__.query.count() + 1
        super(DiscGolfHole,self).__init__(*args, **kwargs)            

    @cached_property
    def json(self):
        return dict(
            id=self.id,
            par=self.par,
            number=self.number,
        )

class DiscGolfGamePlayerScore(Model):
    """
        represents one line on a game score card:
        Twila Reid: <- game
        hole: 1 - kyle: 3 <- hole/player/value
    """
    __table_args__ = (
        (sa.UniqueConstraint('hole_id', 'player_id','score_card_id'),)
    )

    hole = sa.orm.relation('DiscGolfHole', backref=sa.orm.backref('player_scores', lazy='dynamic'))
    hole_id = sa.Column(sa.Integer, sa.ForeignKey('disc_golf_holes.id'))

    player = sa.orm.relation('DiscGolfPlayer', backref=sa.orm.backref('game_scores', lazy='dynamic' ))
    player_id = sa.Column(sa.Integer, sa.ForeignKey('disc_golf_players.id'))

    score_card = sa.orm.relation('DiscGolfScoreCard', backref=sa.orm.backref('game_scores', lazy='dynamic'))
    score_card_id = sa.Column(sa.Integer, sa.ForeignKey('disc_golf_score_cards.id'))

    value = sa.Column(sa.Integer, nullable=False)

    @classmethod
    def get_player_score(cls, hole, player, game):
        sc = DiscGolfScoreCard.query.filter_by(game=game).first()
        result = cls.query.filter_by(
            hole=hole,
            player=player,
            score_card=sc
        ).first()
        if result:
            return result.value

    @cached_property
    def json(self):
        if self.hole and self.player:
            return dict(    
                hole=self.hole.number,
                #course=self.hole.course.name,
                player=self.player.id,
                score_card=self.score_card_id,
                value=self.value, 
                id=self.id,
            )
    

class DiscGolfScoreCard(Model):
    game = sa.orm.relation('DiscGolfGame', uselist=False, backref=sa.orm.backref('score_card', uselist=False))
    game_id = sa.Column(sa.Integer, sa.ForeignKey('disc_golf_games.id'))        

    @classmethod
    def get_game_scores(cls, game_id):
        sc = cls.query.filter_by(game_id=game_id).one()
        return sc.game_player_scores

    @property
    def game_player_scores(self):
        players = self.game.players.all()
        rows = [
            {
                player.name: player.game_scores.filter_by(score_card=self).all()
            } for player in players
        ]
        return rows

    @cached_property
    def json(self):
        return dict(
            game=self.game.id,
            course=self.game.course.name,            
        )
        

class DiscGolfPlayer(Model):
    name = sa.Column(sa.String(255))
    games = sa.orm.relation(
        'DiscGolfGame', 
        secondary='players_games',
        backref=sa.orm.backref(
            'players', lazy='dynamic',
        ),
        lazy='dynamic',
    )
    frisbees = sa.orm.relation(
        'DiscGolfFrisbee', 
        secondary='players_frisbees', 
        backref=sa.orm.backref(
            'players', lazy='dynamic',
        ),
        lazy='dynamic',
    )

    def __init__(self, *args, **kwargs):
        frisbees = None
        if 'frisbees' in kwargs:
            frisbees = kwargs.pop('frisbees')
            if type(frisbees) in [str, unicode]:
                frisbees = [
                    DiscGolfFrisbee.query.get(int(frisbees))
                ]
            if type(frisbees) not in [tuple, list]:
                frisbees = [frisbees]
            kwargs['frisbees'] = frisbees
        super(DiscGolfPlayer, self).__init__(*args, **kwargs)

    def get_scores_for_game(self, game):
        return map(
                lambda x: x.value, 
                DiscGolfGamePlayerScore.query.filter_by(
                    player=self, score_card=game.score_card
                ).order_by('disc_golf_game_player_scores.hole_id').all()
        )

    @cached_property
    def json(self):
        return dict(
            id=self.id,
            name=self.name,
            frisbees=map(
                lambda frisbee: frisbee.name, self.frisbees.all()
            ),
            games=self.games.count(),
        )

    def get_scores_from_game(self,game):
        score_card = game.score_card
        score_query = DiscGolfGamePlayerScore.query.filter_by(
            score_card=score_card,player=self
        ).order_by(DiscGolfGamePlayerScore.hole.number).all()
        return map(lambda x: x.value, score_query)

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

players_frisbees = sa.Table(
    'players_frisbees', Model.metadata,
    sa.Column('players_id', sa.Integer, sa.ForeignKey('disc_golf_players.id')),
    sa.Column('frisbees_id', sa.Integer, sa.ForeignKey('disc_golf_frisbees.id'))
)

def add_score(hole=None, player=None, score_card=None, value=None):
    model_map = dict(
        hole=DiscGolfHole,
        player=DiscGolfPlayer,
        score_card=DiscGolfScoreCard,
    )
    arg_map = dict(
        hole=hole,
        player=player,
        score_card=score_card
    )
    for key,cls in model_map.items():
        if type(arg_map[key]) in [str, unicode, int]:
            arg_map[key] = cls.query.get(arg_map[key])
    return DiscGolfGamePlayerScore(value=value, **arg_map).save()

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
