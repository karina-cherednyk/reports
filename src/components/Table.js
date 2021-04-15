import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { useState } from 'react';

function mapColumnName(name) {
    const names = { ordinal: "№", surname: "Прізвище", firstName: "Ім`я", 
                    lastName: "По батькові", bookNo: "№_залікової книжки", 
                    termGrade: "За роботу в трим", ectsGrade: "Оцінка ЄКТС",
                    examGrade: "За тезу, залік, екзамен", sum: "Разом", nationalGrade: "Національна оцінка"
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


function Table({tableData}){
    let tableColumns = [];
    let dataColumns = [];
    function mapStyle(cell, row, rowIndex, colIndex){
        const error = tableData[rowIndex][dataColumns[colIndex]+'Error']
        const changed = tableData[rowIndex][dataColumns[colIndex]+'Changed']
        if(changed) return {color: "green"};
        else if(error) return {color: "red"}
        else return {color: "black"}
    }

    if(tableData){
        let columns = Object.keys(tableData[0]).map(c => [c, mapColumnName(c)] ).filter(c => c[1]);
        
        dataColumns = columns.map(c => c[0]);
        tableColumns = columns.map(c => ({dataField: c[0], text: c[1], style: mapStyle }) );
    }
    tableColumns.find( x => x.dataField == "ectsGrade").editor = ectsEditor;
    tableColumns.find( x => x.dataField == "nationalGrade").editor = nationalEditor;

    const tableData2 = [...tableData.map(row => ({...row}))]
    const cellEdit = cellEditFactory({
        mode: "click",
        beforeSaveCell: (oldValue, newValue, row, col) => {
        }
    });

    return <BootstrapTable 
            style={{maxWidth: "40vw"}}
            key={++i}
            keyField='id' 
            cellEdit={ cellEdit }
            data={ tableData2 } 
            condensed={true}
            columns={ tableColumns } />
}

