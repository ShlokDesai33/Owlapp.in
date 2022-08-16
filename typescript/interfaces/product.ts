import Post from './post';

/**
 * A 'product' is overarching term for a resource or equipment
 * that is available for rental.
 * 
 * This interface defines base properties of a product.
 * It is inherited by the Product interface.
 * @extends Post
 */
interface ProductBasic extends Post {
  // character count: 100 (including whitespace)
  name: string;
  // amazon s3 url
  image: string;
  // price per unit (inputed by admin or calculated by the system)
  // this could be any unit of measure such a sample / hour / day
  ppu: number;
  // character count: 300 (including whitespace)
  description: string;
  // organization information
  org: {
    // firestore document id
    id: string;
    // character count: 100 (including whitespace)
    name: string;
    // amazon s3 url
    image: string;
  }
  // extend creator field to include number and email
  creator: {
    // firestore document id
    id: string;
    // obtained from google auth
    fullname: string;
    // google auth image url / amazon s3 url
    image: string;
    // phone number
    number: string;
    // obtained from google auth
    email: string;
  }
}

/**
 * A 'product' is overarching term for a resource or equipment
 * that is available for rental.
 * 
 * This interface defines all the properties of a product.
 * @extends ProductBasic
 */
interface Product extends ProductBasic {
  // a variable price range (inputed by admin)
  // empty array if no price range, then the price is the pps
  prices: [{
    // determines the ppu under a certain condition
    case: string;
    // price per unit
    price: number;
  }];
  // Available / Out of Service / Under Maintenance
  status: string;
  // what the product is used for
  applications: string[];
  // what the product cannot be used for
  limitations: string[];
  // how to use the product
  instructions: string[];
}

export type { ProductBasic, Product };