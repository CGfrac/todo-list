const displayController = (projectsContainer, todosContainer) => {
    const _projectsContainer = projectsContainer;
    const _todosContainer = todosContainer;

    const displayProjectsTitles = projects => {
        for (const project of projects) {
            const li = document.createElement('li');
            li.textContent = project;
            _projectsContainer.appendChild(li);
        }
    };

    return {
        displayProjectsTitles
    };
};

export default displayController;
