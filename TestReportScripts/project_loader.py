import os
import xml.etree.ElementTree as XmlTree
import project_info


class ProjectLoader:
    __configuration__: str = ''
    __project_tree__: XmlTree.ElementTree = None

    def __init__(self, configuration = 'configuration.xml'):
        if os.path.exists(configuration):
            self.__configuration__ = configuration
            self.__project_tree__ = XmlTree.parse(self.__configuration__)
        else:
            print('configuration file did not exist')

    def __get_project__(self, project_node):
        proj = None
        try:
            dir = project_node.find('dir').text
            source_dir = project_node.find('source_dir').text
            test_dir = project_node.find('test_dir').text
            tslint_path = project_node.find('tslint_path').text
            lcov_path = project_node.find('lcov_path').text
            execution_path = project_node.find('execution_path').text

            proj = project_info.ProjectDescriptor()
            proj.Directory = dir
            proj.Source_Directory = source_dir
            proj.Test_Directory = test_dir
            proj.Ts_Lint_Path = tslint_path
            proj.Lcov_Path = lcov_path
            proj.Execution_Path = execution_path
        except IOError:
            print('IOError when parsing node')
        except:
            print('Error when parsing node')
        return proj

    def get_sonar_name(self):
        projects_node = self.__project_tree__.getroot()
        sonar = projects_node.get('sonar')
        return sonar

    def get_sonar_version(self):
        projects_node = self.__project_tree__.getroot()
        sonar = projects_node.get('version')
        return sonar

    def get_base_dir(self):
        projects_node = self.__project_tree__.getroot()
        base_dir = projects_node.get('baseDir')
        return base_dir

    def get_projects(self):
        projects: [project_info.ProjectDescriptor] = []
        if os.path.exists(self.__configuration__):
            project_nodes = self.__project_tree__.findall('.//project')
            for project_node in project_nodes:
                proj = self.__get_project__(project_node)
                if proj:
                    projects.append(proj)
        return projects

