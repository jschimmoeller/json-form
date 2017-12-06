import React, { Component } from 'react';

// Define a custom component for handling the root position object
export default class DynamicSource extends Component {
  constructor(props) {
    super(props);
    console.log('constructor: ', props )
    this.state = {...props.formData, sourceSelectValues: [] };
    this.OPTION_VALUES = props.schema && props.schema.custom ? props.schema.custom : ['Select an Option', 'Static', 'Lambda', 'iPaas'];
    this.selectChanged = this.selectChanged.bind(this);
    this.selectValueChanged = this.selectValueChanged.bind(this);
    this.retrieveValues = this.retrieveValues.bind(this);
  }

  onChange(name) {
    return (event) => {
      this.setState((p)=>{
        return { ...p,
          [name]: parseFloat(event.target.value)
        }
      }, () => this.props.onChange(this.state));
    };
  }

  selectChanged(event){
    //console.log('selectChanged', event.target.value)

    const v = event.target.value;
    this.retrieveValues(v);
      this.setState((p)=>{
        //console.log('pppppp', p);
        const x = { ...p };

        x['source'] = v ;

        //console.log('before on change', x)
        this.props.onChange(x);
        return x;
      } );
  }
  selectValueChanged(event){
    console.log('selectValueChanged', event.target.value)
    const v = event.target.value;
      this.setState((p)=>{
        console.log('vvvvv', v);
        const x = { ...p };
        if (v.indexOf('select ') > -1){
          x['sourceValue'] = undefined ;

        } else {
          x['sourceValue'] = v ;

        }


        //console.log('before on change', x)
        this.props.onChange(x);
        return x;
      } );
  }

  buildOption(sName){
    return (<option key={sName} value={sName} >{sName}</option>);
  }

  buildValueOptions(sourceName){
    //console.log('ssss', sourceName, this.OPTION_VALUES[1])
    return this.state.sourceSelectValues.map((i, idx)=>{
      if (idx === 0){
        if (sourceName === 'Default'){
          return (<option key={i} value={i} >{i}</option>)
        } else {
          return (<option key={i} value={undefined} >{i}</option>)
        }
        // 0 is always undefined

      } else {
        return (<option key={i} value={i} >{i}</option>)
      }

    });
  }

  retrieveValues(sourceName){
    switch(sourceName){
      // clear
      default:  
      case this.OPTION_VALUES[0]:
        setTimeout(()=>{
          this.setState((prevState)=>{
            //TODO code here
            const rState = { ...prevState};
            rState['sourceSelectValues'] = undefined;
            return rState;
          })
        }, 0)
        break;
      case this.OPTION_VALUES[1]:
      case this.OPTION_VALUES[2]:
      case this.OPTION_VALUES[3]:
        setTimeout(()=>{
          this.setState((prevState)=>{
            //TODO code here
            const rState = { ...prevState};
            rState['sourceSelectValues'] = ['Retrieving ...'];
            return rState;
          })
        }, 0)
        //TODO get list for Static data objects
        setTimeout(()=>{
          this.setState((prevState)=>{
            //TODO code here
            const rState = { ...prevState};
            if (sourceName === 'Default'){
              rState['sourceSelectValues'] = ['Default'];
              rState['sourceValue'] = 'Default'
              this.props.onChange(rState);
            } else {
              rState['sourceSelectValues'] = ['select a '+ sourceName+" value"].concat([1,2,3].map((i,idx)=>{
                const x = sourceName + ': '+i;
                return (x)
              }));
            }

            return rState;
          })
        }, 1000)
        //console.log('aaaaaaa', aReturn)
        break;
    }

    //sourceSelectValues
  }

  render() {

    const {source, sourceValue} = this.state;

    //<input type="number" value={lat} onChange={this.onChange("lat")} />
    //<input type="number" value={lon} onChange={this.onChange("lon")} />
    let renderSelectValue;
    console.log(source, this.OPTION_VALUES[0], source !== this.OPTION_VALUES[0])
    if (source !== this.OPTION_VALUES[0] && source !== undefined ){
      const o = this.buildValueOptions(source);
      if (o){
        renderSelectValue = (<select onChange={this.selectValueChanged } value={sourceValue}>
                          {o}
                        </select>);
      }

    }
    return (
      <div>
        <div>{this.props.schema.title}{this.props.required ? '*': ''}</div>
        <select onChange={this.selectChanged } value={source}>
          {this.OPTION_VALUES.map((item)=>{
            return this.buildOption(item);
          })}
        </select>
        {renderSelectValue}
      </div>
    );
  }
}
