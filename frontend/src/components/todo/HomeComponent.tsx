import * as React from 'react';
import { Button } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';

interface HomeProps extends RouteComponentProps<any> {
  name: string;
}

export default class HomeComponent extends React.Component<HomeProps> {
  render() {
    return (
      <div className="maxWidth">
        <h1>Welcome, {this.props.match.params.name}!</h1>
        <div className='container'>
          <Button
            onClick={() => {
              this.props.history.push('/todos');
            }}
          >
            Show Todo List
          </Button>
        </div>
      </div>
    );
  }
}
