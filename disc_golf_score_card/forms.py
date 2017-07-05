import wtforms
from wtforms import fields, validators, widgets, Form
import models 

class AddFrisbeeForm(Form):
    name = fields.StringField('Name', validators=[validators.DataRequired])
    brand = fields.StringField('Brand')
    disc_type = fields.SelectField('Type', choices=zip(models.DiscGolfFrisbee.DISC_TYPES,models.DiscGolfFrisbee.DISC_TYPES))

class AddCourseForm(Form):
    name = fields.StringField('name')
    location = fields.StringField('location')
    number_of_holes = fields.IntegerField('number of holes')
