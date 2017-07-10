
class classproperty(object):
    def __init__(self, instance):
        self.getter = instance
    
    def __get__(self, instance, owner):
        return self.getter(owner)
