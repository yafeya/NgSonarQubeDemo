import os
import project_loader
import test_report_updater


def __generate_reports__():
    loader = project_loader.ProjectLoader()
    projects = loader.get_projects()
    current_dir = os.path.abspath(os.curdir)
    for project in projects:
        base_dir = loader.get_base_dir()
        proj_dir = '{arg1}/{arg2}'.format(arg1=base_dir, arg2=project.Directory)
        os.chdir(proj_dir)

        print('*********npm install start*********')
        os.system('npm install')
        print('*********npm install complete*********')

        print('*********ng build start*********')
        os.system('ng build')
        print('*********ng build complete*********')

        print('*********ng test start*********')
        os.system('ng test --watch=false --code-coverage')
        print('*********ng test complete*********')

        print('*********update execution report start*********')
        updater = test_report_updater.TestReportUpdater(project)
        updater.update_report()
        print('*********update execution report complete*********')
        os.chdir(current_dir)


if __name__ == "__main__":
    __generate_reports__()
