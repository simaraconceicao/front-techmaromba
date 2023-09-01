import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [list, setList] = useState([])
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState('');
  const [link, setLink] = useState('');
  const [mensagem, setMensagem] = useState('');
  const baseURL = 'http://localhost:3000/techmaromba'

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aqui você pode realizar ações com os dados do formulário, como enviá-los para o servidor
    // ou fazer qualquer outra operação desejada.
    const formData = {
      name: nome,
      description: descricao,
      urlImage: foto,
      urlProfile: link,
    };

    try {
      const response = await axios.post(`${baseURL}/add`, formData);
      console.log('Resposta do servidor:', response.data);
      setMensagem('Formulário enviado com sucesso!');
      // Reinicializar os campos após a submissão, se necessário.
      setNome('');
      setDescricao('');
      setFoto('');
      setLink('');
      setTimeout(() => {
        setMensagem('');
      }, 1000); // Oculta a mensagem após 3 segundos (3000 ms)
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setMensagem('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
      setTimeout(() => {
        setMensagem('');
      }, 1000);
    }
    console.log('Dados do formulário:', { nome, descricao, foto, link });
    // Reinicializar os campos após a submissão, se necessário.
    setNome('');
    setDescricao('');
    setFoto('');
    setLink('');
  };
  
  useEffect(() => {
    async function getData() {
      const response = await axios.get(`${baseURL}/all`)
      setList(response.data)
    }
    getData()
  }, [list])
  
  return (
    <>
      <header className="header">
        <div className="textos">
        <h1 className="header_title">#techmaromba</h1>
        <p className="header_description">Uma comunidade que promove tech, saúde, bem-estar e maromba. Acompanhe esse bonde e todo dia tenha uma inspiração pra se mover, se cuidar e crescer na carreira em tecnologia!</p>
        </div>
        {mensagem && <div className="tooltip">{mensagem}
      </div>}
      <div className="meu-formulario">
      <h2 className="form_title">Cadastre uma #techmaromba:</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome"
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            rows="3"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite a descrição"
          />
        </div>

        <div className="form-group">
          <label htmlFor="foto">Foto:</label>
          <input
            type="text"
            id="foto"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            placeholder="URL da foto"
          />
        </div>

        <div className="form-group">
          <label htmlFor="link">Link:</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="URL do link"
          />
        </div>

        <button type="submit">Enviar</button>
        <div>
    </div>
      </form>
    </div>
      </header>
      <div className="cards">
        {
          list.map((techMaromba) => {
            return(
              <>
                <div className="card">
                  <a href={techMaromba.urlProfile} target="_blank" rel="noreferrer">
                    <img src={techMaromba.urlImage} className="card_img" alt="foto" />
                  </a>
                  <h2 className="card_name">
                    {techMaromba.name}
                  </h2>
                  <p className="card_descripition">
                    {techMaromba.description}
                  </p>
                </div>
              </>
            )
          })
        }
      </div>
      <footer className="footer">
      <p>Feito com 🤍 por Simara Conceição.</p>
    </footer>
    </>
  )
}

export default App
