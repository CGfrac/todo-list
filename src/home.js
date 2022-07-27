import Project from './project.js';

const home = (() => {
    const _projects = {};
    const _proto = Project('home', 0);
    let _nextProjectId = 1;

    const getProject = id => _projects[id];
    const getProjectsTitles = () => {
        const titles = [];
        for (const project of Object.values(_projects)) {
            titles.push(project.getTitle());
        }
        return titles;
    };

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
        getProjectsTitles,
        addProject,
        deleteProject
    });
})();

export default home;
