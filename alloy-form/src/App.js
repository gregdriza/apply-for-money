import { useState, useEffect } from 'react';
import { isEmpty} from 'lodash'
import logo from './logo.svg';
import './App.css';
import Form from './form';
import Table from './table';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function App() {
  const [status, setStatus] = useState({
    status: {},
    manualReviewData: [],
    errors: {}
  });
  const renderOutcome = () => {
    if (isEmpty(status.status) && isEmpty(status.errors)) {
      console.log('is in here actually')
      return (
        <div>
          Submit form to see if you're eligible to get money!
        </div>
      )
    } else if (!isEmpty(status.status) && isEmpty(status.errors) || isEmpty(status.errors && isEmpty(status.status))) {

      const { result, outcome, score, tags } = status.status

      const outcomeMap = { "Approved": 'success', "Denied": 'warning', "Manual Review": 'info' }

      if (outcome == "Approved" || outcome == "Denied" || outcome == "Manual Review") {

        return (
          <Alert severity={outcomeMap[outcome]}>
            <p>Result: {result}</p>
            <p>Outcome: {outcome}</p>
            <p>Score: {score}</p>
            <p>tags: {tags[0]}</p>
          </Alert>
        )
      } else if(!isEmpty(status.errors)) {
        const { message } = status.errors
        return (
          <div>
            <h3>There were some problems with the evaluation that was submitted:</h3>
            <Alert severity="error">{message}</Alert>
          </div>
        )
      }    
    } 
  }

  return (
    <div className="App">
      <h1>Apply for Money INC</h1>
      <Container style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', width: '90%' }}>
        <Box sx={{ display: 'flex', justifyContent:'space-between', flexDirection: 'row'}}>
          <Box component={Paper} sx={{ width: '45%', maxHeight: '10%', overflowY: 'scroll'}}>
          <h3>User Status</h3>
            {renderOutcome()}
          </Box>
          <Box sx={{ width: '50%'}}>
            <Form setStatus={(status) => setStatus(status)} />
          </Box>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', maxWidth: '70%'}}>
          <h3>Manual Review</h3>
          <Table manualReviewData={status.manualReviewData} />
        </Box>
      </Container>
    </div>
  );
}

export default App;
