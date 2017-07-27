from fabric import api, colors

@api.task
def deploy():
<<<<<<< HEAD
    print colors.red("pushing to github")
    api.local("git push origin master")
    print colors.green("done")
    print colors.blue("pushing to heroku")
    api.local("git push heroku master")
=======
    print colors.yellow("pushing to github")
    api.local('git push origin master')
    print colors.green("done")
    print colors.blue("pushing to heroku")
    api.local('git push heroku master')
>>>>>>> d35ba661bfdbf211071114bb5fe845cc35c5a7bf
    print colors.green("done")
