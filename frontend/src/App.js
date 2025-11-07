import { useState, useEffect } from 'react';
import axios from 'axios';


import './ultraLuxury.css';

function App() {
  const [showResponse, setShowResponse] = useState(true);
  const [showHistory, setShowHistory] = useState(true);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/history')
      .then(res => setHistory(res.data))
      .catch(() => setHistory([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);
    try {
      const res = await axios.post('/api/interpret', { request: input });
      setResponse(res.data);
      setHistory([res.data, ...history]);
      setInput('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error processing request');
    }
  };

  return (
      <div className="page">
        <div className="card">
          <div className="title">Natural Language Date Interpreter</div>
          <form onSubmit={handleSubmit} className="form">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter a date or product request..."
              className="input"
              required
            />
            <button type="submit" className="button">Interpret</button>
          </form>
          {error && <div className="error">{error}</div>}
          <div className="accordion">
            <div className="accordionHeader" onClick={() => setShowResponse(v => !v)}>
              <span className="arrow" style={{transform: showResponse ? 'rotate(0deg)' : 'rotate(-90deg)'}}>{showResponse ? '▼' : '►'}</span>
              Response
            </div>
            {showResponse && response && (
              <div className="accordionContent">
                {/* Dynamic table for latest response */}
                {(() => {
                  let respObj = response;
                  if (typeof response === 'string') {
                    try {
                      respObj = JSON.parse(response);
                    } catch (e) {
                      respObj = { error: 'Invalid JSON' };
                    }
                  }
                  const keys = respObj && typeof respObj === 'object' ? Object.keys(respObj) : [];
                  return keys.length > 0 ? (
                    <div className="responseTableWrapper">
                      <table className="subResponseTable">
                        <thead>
                          <tr>
                            {keys.map(key => (
                              <th key={key} className="subResponseKey">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {keys.map(key => {
                              // If key is 'response' and value is a JSON string, show sub-table
                              if (key === 'response' && typeof respObj[key] === 'string') {
                                let subObj = {};
                                try {
                                  subObj = JSON.parse(respObj[key]);
                                } catch (e) {
                                  subObj = { error: 'Invalid JSON' };
                                }
                                const subKeys = Object.keys(subObj);
                                return (
                                  <td key={key} className="subResponseValue">
                                    <table className="subResponseTable">
                                      <thead>
                                        <tr>
                                          {subKeys.map(subKey => (
                                            <th key={subKey} className="subResponseKey">{subKey.charAt(0).toUpperCase() + subKey.slice(1)}</th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          {subKeys.map(subKey => (
                                            <td key={subKey} className="subResponseValue">{
                                              typeof subObj[subKey] === 'object'
                                                ? JSON.stringify(subObj[subKey])
                                                : subObj[subKey]
                                            }</td>
                                          ))}
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                );
                              } else {
                                return (
                                  <td key={key} className="subResponseValue">{
                                    typeof respObj[key] === 'object'
                                      ? JSON.stringify(respObj[key])
                                      : respObj[key]
                                  }</td>
                                );
                              }
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <span className="subResponseValue">No response data</span>
                  );
                })()}
              </div>
            )}
          </div>
          <div className="accordion">
            <div className="accordionHeader" onClick={() => setShowHistory(v => !v)}>
              <span className="arrow" style={{transform: showHistory ? 'rotate(0deg)' : 'rotate(-90deg)'}}>{showHistory ? '▼' : '►'}</span>
              History
            </div>
            {showHistory && (
              <div className="accordionContent">
                <div className="historyTableWrapper">
                  <table className="historyTable">
                    <thead>
                      <tr>
                        {(() => {
                          // Get all possible columns from history, or show a default column if empty
                          const columns = history.length > 0
                            ? Array.from(history.reduce((keys, item) => {
                                Object.keys(item).forEach(k => keys.add(k));
                                return keys;
                              }, new Set()))
                            : ['No Columns'];
                          return columns.map(key => (
                            <th key={key} className="historyTableHeader">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                          ));
                        })()}
                      </tr>
                    </thead>
                    <tbody>
                      {history.length === 0 ? (
                        <tr className="historyItem">
                          <td className="historyTableCell" colSpan={1} style={{textAlign: 'center'}}>
                            No data available
                          </td>
                        </tr>
                      ) : (
                        history.map((item, idx) => (
                          <tr key={idx} className="historyItem">
                            {Array.from(
                              history.reduce((keys, itm) => {
                                Object.keys(itm).forEach(k => keys.add(k));
                                return keys;
                              }, new Set())
                            ).map(key => {
                              if (key === 'response' && typeof item[key] === 'string') {
                                let subObj = {};
                                try {
                                  subObj = JSON.parse(item[key]);
                                } catch (e) {
                                  subObj = { error: 'Invalid JSON' };
                                }
                                const subKeys = Object.keys(subObj);
                                return (
                                  <td key={key} className="historyTableCell">
                                    <table className="subResponseTable">
                                      <thead>
                                        <tr>
                                          {subKeys.map(subKey => (
                                            <th key={subKey} className="subResponseKey">{subKey.charAt(0).toUpperCase() + subKey.slice(1)}</th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          {subKeys.map(subKey => (
                                            <td key={subKey} className="subResponseValue">{
                                              typeof subObj[subKey] === 'object'
                                                ? JSON.stringify(subObj[subKey])
                                                : subObj[subKey]
                                            }</td>
                                          ))}
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                );
                              } else {
                                return (
                                  <td key={key} className="historyTableCell">{
                                    typeof item[key] === 'object' ? JSON.stringify(item[key]) : (item[key] !== undefined ? item[key] : '')
                                  }</td>
                                );
                              }
                            })}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}

export default App;
