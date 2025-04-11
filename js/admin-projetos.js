const baseURL = "https://meu-portifolio-3wf0.onrender.com/api/projetos";
let projetos = [];

function carregarProjetos() {
    fetch(baseURL)
        .then(res => res.json())
        .then(data => {
            projetos = data;
            renderTabela();
        });
}

function renderTabela() {
    const tabela = document.getElementById('tabela-projetos');
    tabela.innerHTML = '';
    projetos.forEach(proj => {
        tabela.innerHTML += `
      <tr>
        <td>${proj.id}</td>
        <td>${proj.titulo}</td>
        <td>${proj.descricao}</td>
        <td><a href="${proj.linkgithub}" target="_blank">GitHub</a></td>
        <td><a href="${proj.linkdeploy}" target="_blank">Deploy</a></td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarProjeto(${proj.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="removerProjeto(${proj.id})">Excluir</button>
        </td>
      </tr>
    `;
    });
}

function editarProjeto(id) {
    const projeto = projetos.find(p => p.id === id);
    document.getElementById('idProjeto').value = projeto.id;
    document.getElementById('titulo').value = projeto.titulo;
    document.getElementById('descricao').value = projeto.descricao;
    document.getElementById('linkGitHub').value = projeto.linkgithub;
    document.getElementById('linkDeploy').value = projeto.linkdeploy;
}

function removerProjeto(id) {
    fetch(`${baseURL}/${id}`, {
        method: 'DELETE'
    }).then(() => {
        projetos = projetos.filter(p => p.id !== id);
        renderTabela();
    });
}

function cancelarEdicao() {
    document.getElementById('form-projeto').reset();
    document.getElementById('idProjeto').value = '';
}

document.getElementById('form-projeto').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('idProjeto').value;
    const novo = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        linkgithub: document.getElementById('linkGitHub').value,
        linkdeploy: document.getElementById('linkDeploy').value
    };

    const url = id ? `${baseURL}/${id}` : baseURL;
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novo)
    })
        .then(res => res.json())
        .then(() => {
            carregarProjetos();
            cancelarEdicao();
            document.getElementById('msg-status').textContent = "Salvo com sucesso!";
        });
});

carregarProjetos();
