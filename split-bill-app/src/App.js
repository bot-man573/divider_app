import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import './App.css';

function App() {
  const [totalAmount, setTotalAmount] = useState('');
  const [members, setMembers] = useState([]);
  const [memberName, setMemberName] = useState('');
  const [memberRatio, setMemberRatio] = useState('');

  const addMember = () => {
    if (memberName.trim() !== '' && memberRatio.trim() !== '') {
      setMembers([...members, { name: memberName, ratio: parseFloat(memberRatio) }]);
      setMemberName('');
      setMemberRatio('');
    }
  };

  const calculateShare = (ratio) => {
    const totalRatio = members.reduce((acc, member) => acc + member.ratio, 0);
    if (totalRatio === 0) return 0;
    return ((parseFloat(totalAmount) * ratio) / totalRatio).toFixed(2);
  };

  return (
    <div className="App">
      <h1>割り勘アプリ</h1>

      <div>
        <TextField
          label="支払い総額"
          type="number"
          variant="outlined"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          margin="normal"
        />
      </div>

      <div>
        <TextField
          label="メンバーの名前"
          type="text"
          variant="outlined"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="比率"
          type="number"
          variant="outlined"
          value={memberRatio}
          onChange={(e) => setMemberRatio(e.target.value)}
          style={{ marginLeft: 10 }}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addMember}
          style={{ marginLeft: 10 }}
        >
          追加
        </Button>
      </div>

      <h2>メンバー</h2>
      <ul>
        {members.map((member, index) => (
          <li key={index}>
            {member.name} - 比率: {member.ratio}, 支払額: {calculateShare(member.ratio)}円
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;