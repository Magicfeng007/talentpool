import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Input} from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import axios from 'axios';
var XMLParser = require('react-xml-parser');


class App extends Component {

    constructor(props) {
        super(props);
    }

    search = (keyword) => {
        let url = "http://www.gzas.org.cn/rcgz/rck/date.xml";
        // console.log(keyword);
        axios.get(url)
            .then(data => {
                /*console.log('data');
                console.log(data);

                console.log('xml data');
                // console.log(data.data);
                let parser = new XMLParser;
                var xmlData = parser.parseFromString(data.data);
                console.log(xmlData);
                console.log(xmlData.getElementsByTagName('MetaDataTitle'));
                console.log(xmlData.getElementsByTagName('RelPhoto'));*/

                //使用DOMParser
                let domParser = new DOMParser();
                let XMLDocument = domParser.parseFromString(data.data,'text/xml');
               /* console.log('xdata');
                console.log(XMLDocument);*/

                let HTMLCollections = XMLDocument.children;
                // console.log(HTMLCollections);
                let HTMLCollectionArray = HTMLCollections[0].children;
                // console.log(HTMLCollectionArray);
               /* for(let i=0;i<HTMLCollectionArray.length;i++){
                    let nodeData = HTMLCollectionArray.children;
                    console.log(nodeData);
                    // console.log(nodeData)
                }*/

                for(let i=0;i<HTMLCollectionArray.length;i++){
                    let personNode = HTMLCollectionArray[i].children;
                    /*console.log('nodeData');
                    console.log(personNode);
                    console.log(personNode[0]);*/
                    if(keyword && keyword === personNode[0].textContent){
                        console.log('姓名:    ' + personNode[0].textContent);
                        console.log('源链接:  ' + personNode[2].textContent.trim());
                        console.log('出生信息:' + personNode[4].textContent.trim());
                        console.log('发布时间:' + personNode[5].textContent);
                        console.log('简介：   ' + personNode[7].textContent);
                        console.log('头像链接:' + personNode[11].textContent);
                    }
                    // console.log(nodeData)
                }


                /*console.log('xdata-dataa');
                console.log(XMLDocument.documentElement.innerHTML);

                console.log('xdata-data2');
                console.log(XMLDocument.activeElement.childNodes);
                console.log(XMLDocument.activeElement.childNodes.length);

                // console.log(xdata.activeElement.childNodes[0].data.innerHTML);
                this.iterator(XMLDocument.activeElement.childNodes);*/



            })
            .catch(error => {
                console.log('error');
                console.log(error);
            })
            .then(finaly => {
                console.log('finaly');
                console.log(finaly);
            });
    };

    iterator=(NodeList) =>{
        for(let i=1;i<=5;i++){
            if(i%2 !== 0 ){
                console.log("iterator:" + i);
                console.log(NodeList[i].innerHTML);
                console.log(NodeList[i].childNodes);
                console.log(NodeList[i].children);
            }
        }
    }


    render() {

        const Search = Input.Search;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <Search placeholder="请输入需要搜索的文字" onSearch={value => this.search(value)} style={{width: 200}}/>
            </div>
        );
    }
}

export default App;
