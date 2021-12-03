import React from "react";
import {withRouter} from "react-router-dom";

import Navbar from '../../components/navbar';

import AuthService from '../../services/auth-service';

import M from "materialize-css";
import "../../assert/css/rowmaterial.css";
import RawMaterialService from "../../services/raw-material-service";
import * as path from "path";

class EditRawMaterials extends React.Component {

    constructor(props) {
        super(props);
        this.selectFiles = this.selectFiles.bind(this);

        document.addEventListener("DOMContentLoaded", function () {
            var elems = document.querySelectorAll("select");
            M.FormSelect.init(elems, {});
        });

        this.message = '';
        const user = AuthService.getCurrentUser();

        if (!user || user.customerType !== 'Supplier') {
            this.props.history.push("/");
            window.location.reload();
        }

        this.state = {
            id: 0,
            customerId: AuthService.getCurrentUser().customerId,
            imagePath: [],
            selectedFiles: undefined,
            progressInfos: [],
            previewImages: [],
            rawMaterialName: "",
            unitType: "Kg",
            unitPrice: 0,
            quantity: 0,
            path: [],
            rawData: [],
            description:'',
        };

    }

    componentDidMount() {
        RawMaterialService.getRawDataById(this.state.customerId).then((response) => {

            console.log("response test : ", response.data);
            this.setState({
                id: 0,
                customerId: AuthService.getCurrentUser().customerId,
                imagePath: [],
                selectedFiles: undefined,
                progressInfos: [],
                previewImages: [],
                rawMaterialName: "",
                unitType: "Kg",
                unitPrice: 0,
                quantity: 0,
                path: [],
                rawData: response.data
            });
        });
    }

    selectFiles(event) {
        let images = [];

        for (let file of event.target.files) {
            images.push(URL.createObjectURL(file));
        }

        this.setState({
            customerId: AuthService.getCurrentUser().customerId,
            imagePath: [],
            selectedFiles: event.target.files,
            progressInfos: [],
            previewImages: images
        });

    }

    uploadImage(event) {
        event.preventDefault();
        const selectedFiles = this.state.selectedFiles;

        for (let i = 0; i < selectedFiles.length; i++) {
            this.upload(i, selectedFiles[i]);
        }
    }

    upload(idx, file) {

        RawMaterialService.upload(file).then((filePath) => {
            this.state.path[idx] = filePath.data.path.toString();
        }).catch((error) => {
            this.message = error.message + "Image Not Uploaded ";
        });
    }

    register(event) {

        event.preventDefault();

        if(this.state.rawMaterialName !== "" && this.state.unitPrice !== 0 && this.state.quantity !== 0 && this.state.description !== "" && this.state.path.length > 0)
        {
            this.data = {
                customerId: AuthService.getCurrentUser().customerId,
                rawMaterialName: this.state.rawMaterialName,
                unitType: this.state.unitType,
                unitPrice: this.state.unitPrice,
                quantity: this.state.quantity,
                path: this.state.path,
                rawId: this.state.id,
                description: this.state.description
            }

            if (this.state.path.length > 0) {

                if (this.state.id === 0) {
                    RawMaterialService.registerData(this.data);
                    this.componentDidMount();
                    window.location.reload();
                } else {
                    RawMaterialService.edit(this.data).then((response) => {
                        alert(response.data.toString())
                    });
                    this.componentDidMount();
                    window.location.reload();
                }

            } else {
                this.message = 'Image or Images are not uploaded !!!!';
            }
        }
        else
        {
            alert("Please fill the required field !!!");
        }

    }

    editRawMaterials(id) {

        RawMaterialService.getByRawId(id).then((response) => {
            this.setState({
                id: response.data.rawId,
                previewImages: response.data.imagePath,
                rawMaterialName: response.data.rawMaterialName,
                unitType: response.data.unitType,
                unitPrice: response.data.unitPrice,
                quantity: response.data.quantity
            })
        });
    }

    delete(id) {
        RawMaterialService.delete(id).then((response) => {
            this.componentDidMount();
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div class="valign-wrapper row middle-box">
                    <div class="col s4 card hoverable l3">
                        <form>
                            <div class="card-content">
                                <span class="card-title">Raw Materials</span>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <label for="material_name" className={'required'}>Material Name</label>
                                        <input
                                            type="text"
                                            class="validate"
                                            name="materialname"
                                            id="material_name"
                                            onChange={(e) => this.setState({rawMaterialName: e.target.value})}
                                            value={this.state.rawMaterialName}
                                        />
                                    </div>
                                    <div class="input-field col s12">
                                        <select
                                            ref="dropdown"
                                            id="unit_type"
                                            onChange={(e) =>
                                                this.setState({unitType: e.target.value})}
                                            value={this.state.unitType}
                                        >
                                            <option value="Kg">Kg</option>
                                            <option value="g">g</option>
                                            <option value="l">l</option>
                                            <option value="ml">ml</option>
                                            <option value="piece">piece</option>
                                        </select>
                                        <label for="unit_type" className={'required'}>Unit Type</label>
                                    </div>
                                    <div class="input-field col s12">
                                        <label for="unit_price" className={'raw-material-edit required'}>Unit Price</label>
                                        <input
                                            type="number"
                                            step=".001"
                                            class="validate"
                                            name="unitprice"
                                            id="unit_price"
                                            onChange={(e) => this.setState({unitPrice: e.target.value})}
                                            value={this.state.unitPric == 0 ? '' : this.state.unitPric}
                                        />
                                    </div>
                                    <div class="input-field col s12">
                                        <label for="quantity" className={'raw-material-edit required'}>Quantity</label>
                                        <input
                                            type="number"
                                            step=".001"
                                            class="validate"
                                            name="quantity"
                                            id="quantity"
                                            onChange={(e) => this.setState({quantity: e.target.value})}
                                            value={this.state.quantity == 0 ? '' : this.state.quantity}
                                        />
                                    </div>
                                    <div className="input-field col s12">
                                        <label htmlFor="material_name" className={'required'}>Description</label>
                                        <textarea
                                            type="text"
                                            className="validate"
                                            name="materialname"
                                            id="material_name"
                                            onChange={(e) => this.setState({description: e.target.value})}
                                            value={this.state.description}
                                        />
                                    </div>
                                    <div class="input-field col s12">
                                        <lable
                                            class="btn btn-register waves-effect waves-light raw-material-ui-buttons image-upload-lable">
                                            <input
                                                type="file"
                                                multiple
                                                name="file"
                                                onChange={this.selectFiles}
                                            />
                                        </lable>
                                    </div>

                                    <div class="input-field col s12">
                                        {this.state.previewImages.length > 0 && (
                                            this.state.previewImages.map((imga, i) => {
                                                return <div className='col s3 card-image top-style'><img
                                                    className="preview" src={imga} alt={"image-" + i} key={i}/></div>;
                                            }))
                                        }
                                        <button
                                            className="btn waves-effect waves-light raw-material-ui-buttons"
                                            onClick={(event) => this.uploadImage(event)}
                                            disabled={this.state.previewImages.length === 0}>
                                            Upload Images
                                            <i className="material-icons right">file_upload</i>
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <div class="card-action">
                                <button
                                    class="btn btn-register waves-effect waves-light raw-material-ui-buttons"
                                    onClick={(event, id) => this.register(event)}
                                    disabled={this.state.previewImages.length === 0}
                                >
                                    Add Raw Materials
                                    <i class="material-icons right">send</i>
                                </button>
                            </div>
                            <div>
                                <lable>{this.message}</lable>
                            </div>
                        </form>
                    </div>
                    <div class="col s8">
                        <table class="bordered highlight">
                            <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Unit Type</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th>Images</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                this.state.rawData.map(rawData =>
                                    <tr key={rawData.rawId}>
                                        <td>{rawData.rawMaterialName}</td>
                                        <td>{rawData.unitType}</td>
                                        <td>{rawData.unitPrice}</td>
                                        <td>{rawData.quantity}</td>
                                        <td className='table-image-td'>
                                            {
                                                rawData.imagePath.map((images, i) => {
                                                    return <div className='raw-table-images'><img
                                                        src={images.toString()} key={i}/></div>
                                                })
                                            }
                                        </td>
                                        <td>
                                            <button
                                                className="btn waves-effect" title="Edit"
                                                onClick={(event => this.editRawMaterials(rawData.rawId))}><i
                                                className="material-icons">edit</i>
                                            </button>
                                            <button
                                                className="btn waves-effect delete-button-raw" title="Delete"
                                                onClick={(event => this.delete(rawData.rawId))}><i
                                                className="material-icons">delete</i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EditRawMaterials)