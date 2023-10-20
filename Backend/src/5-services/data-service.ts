import { CategoryModel, ICategoryModel } from "../3-models/category-model";
import { ResourceNotFoundError } from "../3-models/error-models";
import { IProductModel, ProductModel } from "../3-models/product-model";

function getAllCategories(): Promise<ICategoryModel[]> {
    return CategoryModel.find().exec();
}

function getProductsByCategory(categoryId: string): Promise<IProductModel[]> {
    return ProductModel.find({ categoryId }).populate("category").exec();
}

function addProduct(product: IProductModel): Promise<IProductModel> {
    product.validateSync();
    return product.save();
}

async function deleteProduct(_id: string): Promise<void> {
    const deleteProduct = await ProductModel.findByIdAndDelete(_id).exec();
    if (!deleteProduct) throw new ResourceNotFoundError(_id);
}



export default {
    getAllCategories,
    getProductsByCategory,
    addProduct,
    deleteProduct
};

