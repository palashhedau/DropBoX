import React, { Component } from 'react';
import Modal from 'redux-modal';
import {viewFile} from '../../actions/viewFileAction'
import {starItems} from '../../actions/StarredAction'
import {connect} from 'react-redux'
import {deleteFile} from '../../actions/uploadFileAction'
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux'
import store  from '../../store'


class Modal1 extends Component{
  constructor() {
      super();
   
      this.state = {
        modalIsOpen: false
      };
   
      this.openModal = this.openModal.bind(this) ; 
       
  }

  openModal() {
      this.setState({modalIsOpen: true});
   }
   

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }


  closeModal() {
    this.setState({modalIsOpen: false});
  }


	

	render(){

    const customStyles = {
      content : {
        top                   : '30%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };


		return(

			 <div>
                      <button onClick={this.openModal.bind(this)}>Open Modal</button>
                      
                     
                      <Modal
                        isOpen={this.state.modalIsOpen}
                        style= {customStyles}
                        onRequestClose={this.closeModal}
                        shouldCloseOnOverlayClick={false}
                        contentLabel="Profile">

                        
                        <button onClick={this.closeModal.bind(this)}>close</button>
                       
                      </Modal>
                      

                    </div>


		)
	}
} 


function mapDispatchToProps(dispatch){
	return {
		viewFile : (filename) => dispatch(viewFile(filename)),
		starItems : (item) => dispatch(starItems(item)),
		deleteFile : (email , filename ) => dispatch(deleteFile(email , filename ))
	}
}

function mapStateToProps(state) {
    return {
        isAuthenticated : state.AuthReducer.isAuthenticated,
        listOfFiles : state.fileUploadReducer.listOfFiles,
        fileContent : state.getClickedFileDataReducer.fileData, 
        listOfSTarredFiles : state.fileUploadReducer.listOfStarredFiles,
        listOfRecentFiles : state.fileUploadReducer.listOfRecentFiles
    };
}



export default connect(mapStateToProps , mapDispatchToProps)(Modal1) ;