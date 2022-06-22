import Project from './project.js';

const home = (() => {
    const _projects = {};
    const _proto = Project('home');

    const getProject = title => _projects[title];
    const getProjectsTitles = () => _projects.keys();

    const addProject = (title) => {
        const project = Project(title);
        _projects[title] = project;
    };

    const deleteProject = title => {
        delete _projects[title];
    };

    return Object.assign({}, _proto, {
        getProject,
        getProjectsTitles,
        addProject,
        deleteProject
    });
})();

export default home;
