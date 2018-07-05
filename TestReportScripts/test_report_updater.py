import project_info
import os
import xml.etree.ElementTree as XmlTree


class TestReportUpdater:

    __project__: project_info.ProjectDescriptor = None

    def __init__(self, project: project_info.ProjectDescriptor):
        self.__project__ = project

    def update_report(self):
        report_path = self.__project__.Execution_Path
        if os.path.exists(report_path):
            tree = XmlTree.parse(report_path)
            file_nodes = tree.findall('.//file')
            for file_node in file_nodes:
                path = file_node.get('path')
                updated_path = '{arg1}/{arg2}'.format(arg1=self.__project__.Directory, arg2=path)
                file_node.set('path', updated_path)
            tree.write(report_path)
