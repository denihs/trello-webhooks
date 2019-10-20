import React, { useState } from 'react';
import Data from '../data/logs.json';
import { FormGroup, Label, Input, Button, Alert } from 'reactstrap';

const data = Data && Array.isArray(Data) && Data.length && Data.sort(() => -1);

export const Home = () => {
    const [url, setUrl] = useState('');
    const [token, setToken] = useState('');
    const [key, setKey] = useState('');
    const [trelloId, setTrelloId] = useState('');

    const [alert, setAlert] = useState(null);

    const resetFields = () => {
       setUrl('');
      setToken('');
      setKey('');
      setTrelloId('');
    }

    const handleClick = () => {
      fetch(`https://api.trello.com/1/tokens/${token}/webhooks/?key=${key}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          description: "My first webhook",
          callbackURL: url,
          idModel: trelloId,
        }),
      })
      .then(response => {
        console.log("TRELLO RESPONSE", response);
        if (response.ok) {
          setAlert({
            message: "Tudo certo",
            color: "info",
          });
          resetFields();
          return;
        }
        setAlert({
          message: "Algo deu errado",
          color: "warning",
        });
      })
      .catch(e => {
        setAlert({
          message: "Algo deu MUITO errado",
          color: "danger",
        });
        console.log("TRELLO ERROR", e)
      });
    }
    

  const onDismiss = () => setAlert(null);

    return (
      <div className="container">
          {alert && 
            <Alert color={alert.color} toggle={onDismiss}>
                {alert.message}
            </Alert>
          }
          <div className="form">
            <FormGroup>
              <Label for="url">Url de Callback</Label>
              <Input
                type="text"
                name="url" 
                id="url" 
                placeholder="ex: www.meuexuberantesite.com/trello" 
                value={url}
                onChange={({ target: { value }}) => {setUrl(value)}}
              />
            </FormGroup>

            <FormGroup>
              <Label for="token">Api Token</Label>
              <Input 
                type="text" 
                name="token" 
                id="token" 
                placeholder="ex: 12390ASDASD12312A..." 
                value={token}
                onChange={({ target: { value }}) => setToken(value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="key">Api Key</Label>
              <Input 
                type="text" 
                name="key" 
                id="key" 
                placeholder="ex: 23asd123as2123..." 
                value={key}
                onChange={({ target: { value }}) => setKey(value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="trelloId">Trello Id</Label>
              <Input 
                type="text" 
                name="trelloId" 
                id="trelloId" 
                placeholder="ex: fasr3q4213..." 
                value={trelloId}
                onChange={({ target: { value }}) => setTrelloId(value)}
              />
            </FormGroup>
            <Button color="primary" onClick={() => handleClick()}>Conectar</Button>
          </div>
          <h5>Últimas tarefas alteradas</h5>
          <div className="logs">
            {
              !data ? null : 
              Data.map((log, idx) => {
                const { action, action: { data } } = log;
                const board = data.board || {};
                const list = data.list || {};
                const card = data.card || {};

                const title = card.name || board.name;
                const subTitle = card.name ? board.name : '';

                return (
                  <div key={idx} className="log">
                    <h6 className="title">{title}</h6>
                    <span className="text subTitle">{subTitle} - {list.name}</span>
                    <span className="text info">Ação: {action.type}</span>
                    <span className="text info">id: {card.id}</span>
                    <span className="text info">idShort: {card.idShort}</span>
                    <span className="text info">shortLink: {card.shortLink}</span>
                  </div>
                )}
              )
            }
          </div>
      </div>
    );
};