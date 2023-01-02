/*
    Create Class for Shoe Brands
    Properties: Name-Name of Brand
                Shoe Array-List of Shoes
    Methods: addShoe-Adds a shoe to the shoe list
             deleteShoe-Deletes a shoe from the shoe list
*/
class ShoeBrand {
    constructor (name) {
        this.name = name;
        this.shoes = [];
    }

    addShoe(shoe) {
        this.shoes.push(shoe);
    }

    deleteShoe(shoe) {
        this.shoes.splice(this.shoes.indexOf(shoe), 1);
    }
}

/*
    Create Class for Shoes
    Properties: brandname-The Brand of the Shoe
                shoename-The Name of the Shoe
                type-The Type of Shoe
                size-The Size of the Shoe
                quantity-The Quantity of this Shoe
*/
class Shoe {
    constructor (brandname, shoename, type, size, quantity)
    {
        this.brandname = brandname;
        this.shoename = shoename;
        this.type = type;
        this.size = size;
        this.quantity = quantity;
    }
}

/*
    Create Class to Manage the Shoe Inventory
    Properties: #shoeBrands-List of Shoe Brands
                #shoeInventory-List of all the Shoes
*/
class ShoeInventoryService {
    #shoeBrands = ['Sketchers', 'Nike', 'Reebok', 'Adidas', 'Dr. Martens', 'Timberland', 'Converse'];
    #shoeInventory = [];

    constructor () {
        // Create ShoeBrand Objects from the shoeBrands array and add them to the Inventory
        for (let shoebrand of this.#shoeBrands) {
            this.#shoeInventory.push(new ShoeBrand(shoebrand));
        }
    }

    // Returns All Shoes
    getAllShoes() {
        return this.#shoeInventory;
    }

    // Returns the Specified Brand and it's shoes
    getShoeBrand(brandname) {
        for (let shoebrand of this.#shoeInventory) {
            if (shoebrand.name == brandname) {
                return shoebrand;
            }
        }

        return null;
    }

    // Add Shoe Object to the Brands Shoe List
    addShoe(shoe) {
        for (let shoebrand of this.#shoeInventory) {
            if (shoebrand.name == shoe.brandname) {
                shoebrand.addShoe(shoe);
                return true;
            }
        }

        return false; 
    }

    // Delete Shoe Object from the Brands Shoe List
    deleteShoe(shoe) {
        for (let shoebrand of this.#shoeInventory) {
            if (shoebrand.name == shoe.brandname) {
                shoebrand.deleteShoe(shoe);
                return true;
            }
        } 
        
        return false;
    }
}

var sIS = new ShoeInventoryService();

/*
    Create Class for Updating the Inventory Display
*/
class DOMInvDisplayManager {
    // Redraw the Inventory Display
    // Parameters-Shoe Brand and Shoe Type to Display
    static displayInventory(brand, type)
    {
        var shoebrand = sIS.getShoeBrand(brand);
        var shoetype = type;
        var divID = $('#divInventoryDisplay');

        divID.empty();

        // Create a Card and Insert HTML for the Header
        divID.append(`<div class="card" id="${shoebrand.name}${shoetype}">
                        <div class="card-header">
                            <h4>${shoebrand.name} - ${shoetype}</h4></br>
                            <div class="row">
                                <div class="col-sm-auto">
                                    Add Shoe:
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" id="shoenameinput" class="form-control" placeholder="Shoe Name">
                                </div>
                                <div class="col-sm-3">
                                     <input type="text" id="shoesizeinput" class="form-control" placeholder="Size">
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" id="shoequantityinput" class="form-control" placeholder="Quantity">
                                </div>
                                <div class="col-sm-auto">
                                     <button id="newshoe" class="btn btn-dark form-control" onclick="DOMInvDisplayManager.addShoe('${shoebrand.name}', '${shoetype}')">Add</button>
                                </div>
                            </div>
                        </div>
                        <div class="card-body" id="shoelistbody">
                        </div>
                    </div>
        `);
        
        var divSL = $(`#shoelistbody`);

        // Insert the HTML for the Shoes
        divSL.append(`<div class="row">
                        <div class="col-sm">
                            <b>Shoe Name</b>
                        </div>
                        <div class="col-sm">
                            <b>Shoe Size</b>
                        </div>
                        <div class="col-sm">
                            <b>Shoe Quantity</b>
                        </div>
                            <div class="col-sm">    
                            </div>
                        </div>
                `);

        for (let shoe of shoebrand.shoes) {
            if (shoe.type == shoetype) {
                divSL.append(`<div class="row">
                                    <div class="col-sm">
                                        ${shoe.shoename}
                                    </div>
                                    <div class="col-sm">
                                        ${shoe.size}
                                    </div>
                                    <div class="col-sm">
                                        ${shoe.quantity}
                                    </div>
                                    <div class="col-sm-2">
                                        <button id="deleteshoe" class="btn btn-sm btn-danger form-control" onclick="DOMInvDisplayManager.deleteShoe('${shoebrand.name}', '${shoetype}', '${shoe.shoename}')">Delete</button>
                                    </div>
                                </div>
                `);
            }
        }  
    }

    // Create new Shoe Object and add it to the Brands shoe list and Redraw Display Inventory
    static addShoe(brand, type) {
        let shoe = new Shoe(brand, $('#shoenameinput').val(), type, $(`#shoesizeinput`).val(), $(`#shoequantityinput`).val());
        sIS.getShoeBrand(brand).addShoe(shoe);
        this.displayInventory(brand, type);
    }

    // Delete Shoe Object from Brand Object and Redraw Display Inventory
    static deleteShoe(brand, type, name) {
        var shoebrand = sIS.getShoeBrand(brand);

        for (let shoe of shoebrand.shoes) {
            if (shoe.brandname == brand && shoe.type == type && shoe.shoename == name) {
                shoebrand.deleteShoe(shoe);
            }
        }

        this.displayInventory(brand, type);
    }
}


