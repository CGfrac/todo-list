import Project from './project.js';

const home = (() => {
    const _projects = {};
    const _proto = Project('home', 0);
    let _nextProjectId = 1;

    const getProject = id => _projects[id];
    const getProjects = () => Object.values(_projects);

    const addProject = (title) => {
        const project = Project(title, _nextProjectId);
        _projects[_nextProjectId] = project;
        _nextProjectId++;
    };

    const deleteProject = _nextProjectId => {
        delete _projects[_nextProjectId];
    };

    return Object.assign({}, _proto, {
        getProject,
        getProjects,
        addProject,
        deleteProject
    });
})();

export default home;
