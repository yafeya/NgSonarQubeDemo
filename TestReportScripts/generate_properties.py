import os
import project_loader

__new_line__ = '\n'


def __generate_properties__():
    loader = project_loader.ProjectLoader()
    sonar_name = loader.get_sonar_name()
    sonar_version = loader.get_sonar_version()
    base_dir = loader.get_base_dir()

    lines = list()

    lines.append('sonar.projectKey={arg1}{arg2}'.format(arg1=sonar_name, arg2=__new_line__))
    lines.append('sonar.projectVersion={arg1}{arg2}'.format(arg1=sonar_version, arg2=__new_line__))
    lines.append(__new_line__)

    projects = loader.get_projects()
    sources: str = ''
    tests: str = ''
    tslint_reports: str = ''
    lcov_reports: str = ''
    exe_reports: str = ''

    for idx, val in enumerate(projects):
        project_dir = val.Directory
        project_src = val.Source_Directory
        project_test = val.Test_Directory
        project_tslint = val.Ts_Lint_Path
        project_lcov = val.Lcov_Path
        project_exe = val.Execution_Path
        source = '{arg1}/{arg2}'.format(arg1=project_dir, arg2=project_src)
        test = '{arg1}/{arg2}'.format(arg1=project_dir, arg2=project_test)
        tslint = '{arg1}/{arg2}'.format(arg1=project_dir, arg2=project_tslint)
        lcov = '{arg1}/{arg2}'.format(arg1=project_dir, arg2=project_lcov)
        execution = '{arg1}/{arg2}'.format(arg1=project_dir, arg2=project_exe)

        sources += source
        tests += test
        tslint_reports += tslint
        lcov_reports += lcov
        exe_reports += execution

        if not idx == len(projects) - 1:
            sources += ','
            tests += ','
            tslint_reports += ','
            lcov_reports += ','
            exe_reports += ','

    lines.append('sonar.projectBaseDir={arg1}{arg2}'.format(arg1=base_dir, arg2=__new_line__))
    lines.append('sonar.sources={arg1}{arg2}'.format(arg1=sources, arg2=__new_line__))
    lines.append('sonar.tests={arg1}{arg2}'.format(arg1=tests, arg2=__new_line__))
    lines.append('sonar.test.inclusions = **/*.spec.ts{arg1}'.format(arg1=__new_line__))
    lines.append(__new_line__)

    lines.append('sonar.host.url=http://156.140.160.213:9000{arg1}'.format(arg1=__new_line__))
    lines.append('sonar.login=833f962ae7f83fd3a2344cf00b99f8540ebf76df{arg1}'.format(arg1=__new_line__))
    lines.append('sonar.language=ts{arg1}'.format(arg1=__new_line__))
    lines.append(__new_line__)

    lines.append('sonar.typescript.tslint.reportPaths={arg1}{arg2}'.format(arg1=tslint_reports, arg2=__new_line__))
    lines.append('sonar.typescript.lcov.reportPaths={arg1}{arg2}'.format(arg1=lcov_reports, arg2=__new_line__))
    lines.append('sonar.testExecutionReportPaths={arg1}{arg2}'.format(arg1=exe_reports, arg2=__new_line__))

    return lines


def __write_properties__():
    loader = project_loader.ProjectLoader()
    sonar_name = loader.get_sonar_name()

    print('start to generator sonar-project file...')
    properties_file = 'sonar_{arg1}.properties'.format(arg1=sonar_name)
    fs = open(properties_file, 'w')
    print('the content of the sonar-project is: {arg1}'.format(arg1=__new_line__))
    lines = __generate_properties__()
    for line in lines:
        print(line)
        fs.write(line)

    fs.close()
    print('generator sonar-project file finished...')


if __name__ == "__main__":
    print('*********generate sonar properties start*********')
    __write_properties__()
    print('*********generate sonar properties complete*********')
