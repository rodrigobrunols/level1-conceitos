import React,{useState, useEffect} from 'react';

import Header from './components/Header'

import './App.css';

import api from './services/api'

export default function App(){
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data)
        });
    } , [])

    async function handleAddProject(){
        // setProjects([...projects,`Novo Projeto ${Date.now()}`] );
       const input = document.getElementById('input');
       const title = input.value;

        const response = await api.post('/projects',{
           
            title: `${title} - ${Date.now()}`,
            owner: "Rodrigo"
        })
        console.log(response)
        setProjects([...projects, response.data])

    }

    return (
        <>
            <Header title="Homepage"> 


                <ul>
                  {projects.map(project =><li key={project.id}>{project.title}</li>)}
                </ul>
            </Header>
            <input type="text" id="input"></input>
            <button type="button" onClick={handleAddProject}> Adicionar Projeto</button>

           
        </>
    );
}