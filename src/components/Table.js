import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import {Component} from 'react';

function mapColumnName(name) {
    const names = { ordinal: "№", surname: "Прізвище", firstName: "Ім`я", 
                    lastName: "По батькові", bookNo: "№_залікової книжки", 
                    termGrade: "За роботу в трим", ectsGrade: "Оцінка ЄКТС",
                    examGrade: "За тезу, залік, екзамен", sum: "Разом", 
                    nationalGrade: "Національна оцінка"
                }
    return names[name]

}
const ectsEditor = {
    type: "select",
    options: "ABCDEF".split("").map( c => ({label: c, value: c}))
};

const nationalEditor = {
    type: "select",
    options: ["Відмінно", "Добре", "Задовільно", "Незадовільно"].map( c => ({label: c, value: c}))
}


class Table extends Component{

    constructor(props){
        super(props);

        let tableData = props.tableData;

        this.state = {
            data: tableData
        };
        this.tableColumns = [];
        this.dataColumns = [];

        if(tableData){
            let columns = Object.keys(tableData[0]).map(c => [c, mapColumnName(c)] ).filter(c => c[1]);
            this.dataColumns = columns.map(c => c[0]);
            this.tableColumns = columns.map(c => ({dataField: c[0], text: c[1], style: this.mapStyle }) );
        }
        this.tableColumns.find( x => x.dataField == "ectsGrade").editor = ectsEditor;
        this.tableColumns.find( x => x.dataField == "nationalGrade").editor = nationalEditor;
    }


    mapStyle = (x, y, rowIndex, colIndex) => {
        const error =   this.state.data[rowIndex][this.dataColumns[colIndex]+'Error']
        const changed = this.state.data[rowIndex][this.dataColumns[colIndex]+'Changed']
        if(changed)     return {color: "green"};
        else if(error)  return {color: "red"}
        else            return {color: "black"}
    }

    handleTableChange = (type, { data, cellEdit: { rowId, dataField, newValue } }) => {
        setTimeout( () => {
          const result = data.map((row) => 
              row.ordinal === rowId ? {...row, [dataField]: newValue} : row
          )
          this.setState(() => ({data: result}));
        }, 2000 );
        
    }

    render() {
    return <BootstrapTable 
            remote={{ cellEdit: true }}
            keyField='ordinal' 
            data={ this.state.data } 
            columns={ this.tableColumns } 
            cellEdit={ cellEditFactory({mode: "click"}) }
            onTableChange={this.handleTableChange}
            
            style={{ maxWidth: "40vw" }}
            condensed={true}
            />
    }
}

export default Table;