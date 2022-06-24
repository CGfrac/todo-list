import Project from './project.js';

const home = (() => {
    const _projects = {};
    const _proto = Project('home');

    const getProject = title => _projects[title];
    const getProjects = () => Object.values(_projects);
    const getProjectsTitles = () => Object.keys(_projects);

    const addProject = (title) => {
        const project = Project(title);
        _projects[title] = project;
    };

    const deleteProject = title => {
        delete _projects[title];
    };

    return Object.assign({}, _proto, {
        getProject,
        getProjects,
        getProjectsTitles,
        addProject,
        deleteProject
    });
})();

export default home;
