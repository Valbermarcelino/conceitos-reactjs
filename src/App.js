import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('repositories').then(response => {
        setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: 'www.boa.com',
      techs: ['node','react']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(item => item.id !== id));
    // assigning the list to temp variable
    /*const temp = [...repositories];

    // removing the element using splice
    temp.splice(id, 1);

    // updating the list
    setRepositories(temp);*/
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => (
            <li key={repository.id}> 
              {repository.title}
          
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
