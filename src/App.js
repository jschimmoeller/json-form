import React, { Component } from 'react';
import './App.css';
import DynamicSource from './components/dynamicSource'

import Form from "react-jsonschema-form";

class App extends Component {
  render() {
    const schema = {
      "definitions": {
        "dynamicSource":{
          type: "object",
          required: ["source", "sourceValue"],
          custom: ['Select an Option', 'Static', 'Lambda', 'iPaas'],
          properties: {
            source: {type: "string"},
            sourceValue: {type: "string"}
          }
        }
      },
      type: "object",
      required: ["title", "body", 'contacts', 'modality', 'action'],
      properties: {
        title: {type: "string"},
        body: {type: "string"},
        contacts: {
          title: 'Contacts',
          "$ref": "#/definitions/dynamicSource"
        },
        modality:{

          type: 'array',
          "uniqueItems": true,
          items:{
            enum: ['sms', 'email', 'voice'],
            type:"string"
          }
        },
        action: {
          title: 'Action',
          custom: ['Select an Option', 'Default', 'Lambda'],
          "$ref": "#/definitions/dynamicSource"
        },
        preActions:  {
          title: 'Pre Actions',
          type: 'array',
          items: {
            custom: ['Select', 'Lambda', 'iPaas'],
            "$ref": "#/definitions/dynamicSource"
          }
        },
        postActions:  {
          title: 'Post Actions',
          type: 'array',
          items: {
            custom: ['Select', 'Lambda', 'iPaas'],
            "$ref": "#/definitions/dynamicSource"
          }
        },
        reporting:  {
          title: 'Reporting',
          type: 'array',
          items: {
            custom: ['Select', 'Lambda', 'iPaas'],
            "$ref": "#/definitions/dynamicSource"
          }
        },
      }
    };

    // Define the custom field component to use for the root object
    const uiSchema = {
      contacts:{
        "ui:field": "dynamicSource"
      },
      action: {
        "ui:field": "dynamicSource"
      },
      modality: {
        "ui:widget": "checkboxes"
      },
      preActions: {
        items: {
          "ui:field": "dynamicSource"
        }
      },
      postActions: {
        items: {
          "ui:field": "dynamicSource"
        }
      },
      reporting: {
        items: {
          "ui:field": "dynamicSource"
        }
      },
    };

    // Define the custom field components to register; here our "geo"
    // custom field component
    const fields = {dynamicSource: DynamicSource};


    const log = (type) => console.log.bind(console, type);

    return (      <Form
            schema={schema}
            uiSchema={uiSchema}
            fields={fields}
          onChange={log("changed")}
          onSubmit={log("submitted")}
          onError={log("errors")} />
  )
  }
}

export default App;
