from fabric import api, colors

@api.task
def deploy():
    print colors.yellow("pushing to github")
    api.local('git push origin master')
    print colors.green("done")
    print colors.blue("pushing to heroku")
    api.local('git push heroku master')
    print colors.green("done")
