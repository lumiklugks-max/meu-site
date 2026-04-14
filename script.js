function gerarId() {
    return Date.now(); // ID automático
}

function validarIdade(dataNascimento) {
    const hoje = new Date();
    const nasc = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
        idade--;
    }

    return idade >= 12;
}

function validarEmail(email) {
    return email.endsWith("@gmail.com") ||
           email.endsWith("@hotmail.com") ||
           email.endsWith("@outlook.com");
}

function cadastrar(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;

    if (!validarIdade(dataNascimento)) {
        alert("Usuário deve ter pelo menos 12 anos!");
        return;
    }

    if (!validarEmail(email)) {
        alert("Email deve ser @gmail, @hotmail ou @outlook!");
        return;
    }

    const usuario = {
        id: gerarId(),
        nome,
        dataNascimento,
        email,
        telefone
    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");

    document.querySelector("form").reset();
}

function carregarUsuarios() {
    const tabela = document.getElementById("tabelaUsuarios");
    if (!tabela) return;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.forEach(u => {
        const linha = `
            <tr>
                <td>${u.id}</td>
                <td>${u.nome}</td>
                <td>${u.dataNascimento}</td>
                <td>${u.email}</td>
                <td>${u.telefone}</td>
            </tr>
        `;
        tabela.innerHTML += linha;
    });
}

carregarUsuarios();