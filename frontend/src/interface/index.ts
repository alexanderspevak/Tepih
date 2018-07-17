export interface IRow {
        name?: string;
        type?:string;
        price?:string,
        unit?:string,
        size?:string,
        color?:string,
        description?:string,
        manufacturerName?:string,
        manufacturer_id?:number|string,
        id?:number|null, 
        pic: {  props: { src: String }} 
    }
