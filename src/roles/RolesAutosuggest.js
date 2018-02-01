import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import { client } from '../index'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { setSelectedRoleInAutoSuggest } from './rolesActions'

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      inputRef={ref}
      InputLabelProps={{
          shrink: true
      }}
      label='role'
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square >
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function getSuggestions(value, arr) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
  
    return inputLength === 0
      ? []
      : arr.filter(suggestion => {
          const keep =
            count < 5 && suggestion.name.toLowerCase().slice(0, inputLength) === inputValue;
  
          if (keep) {
            count += 1;
          }
  
          return keep;
        });
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 60,
    width: 200,
    zIndex: 999
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

class RoleAutosuggest extends React.Component {
   constructor() {
       super()
       this.state = {
        value: '',
        suggestions: [],
        fetchedValues: []
      }
   } 

   componentWillMount() {

    const fetched = client.query({ query:  gql`
            query {
                roles {
                    id
                    name
                }
            }
        ` }).then((d) => {
            // console.log(d.data.roles)
            this.setState({
                fetchedValues: d.data.roles
            })
        })
   }
  
  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.state.fetchedValues),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {

    this.props.setSelectedRoleInAutoSuggest(null)
    this.setState({
      value: newValue
    });

    this.props.setSelectedRoleInAutoSuggest(this.state.fetchedValues.find((v) => { return v.name === newValue } ))
  };

  render() {
    const { classes } = this.props;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          value: this.state.value,
          onChange: this.handleChange,
          style: {fontSize: 20}
        }}
      />
    );
  }
}

RoleAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

const withActions = connect(null, { setSelectedRoleInAutoSuggest })(RoleAutosuggest)

export default withStyles(styles)(withActions);