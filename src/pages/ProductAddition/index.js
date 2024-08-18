import classNames from 'classnames/bind';
import styles from './ProductAddition.module.scss';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import { Button } from '../../components/Button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PriceRange from '../../components/PriceRange/PriceRange';
import { useState } from 'react';
import { addProduct } from '../../services/productService';

const cx = classNames.bind(styles);

function ProductAddition() {
    const [formData, setFormData] = useState({
        productImages: [],
        productBackGroundImage: [],
        productName: '',
        productDescription: '',
        productPrice: '',
        productStock: '',
        productPriceRange: [],
        productSKU: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleImageChange = (image, name) => {
        setFormData({
            ...formData,
            [name]: image,
        });
    };
    const handlePriceRangeChange = (priceRanges) => {
        setFormData({
            ...formData,
            productPriceRange: priceRanges,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFormData = new FormData();

        // Thêm các tệp hình ảnh
        formData.productImages.forEach((image) => {
            newFormData.append('productImages', image);
        });
        newFormData.append('productBackGroundImage', formData.productBackGroundImage[0]); // Chỉ có 1 hình nền

        // Thêm các trường khác
        newFormData.append('productName', formData.productName);
        newFormData.append('productDescription', formData.productDescription);
        newFormData.append('productPrice', formData.productPrice);
        newFormData.append('productStock', formData.productStock);
        newFormData.append('productPriceRange', JSON.stringify(formData.productPriceRange));
        newFormData.append('productSKU', formData.productSKU);

        try {
            await addProduct(newFormData);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(formData);
    return (
        <form onSubmit={handleSubmit} className={cx('product_add_wrap')}>
            <div className={cx('product_add_nav')}>
                <div className={cx('product_add_nav_')}>Thông tin cơ bản</div>
                <div className={cx('product_add_nav_')}>Thông tin bán hàng</div>
                <div className={cx('product_add_nav_')}>Thông tin khác</div>
            </div>
            <div className={cx('product_add_info')}>
                <div className={cx('product_add_info_header')}>Thông tin cơ bản</div>
                <div className={cx('product_add_info_')}>
                    <div className={cx('product_add_info_field')}>
                        <span>* </span>
                        <span>Hình ảnh sản phẩm</span>
                    </div>
                    <div className={cx('product_add_info_field_input')}>
                        <div className={cx('product_add_info_field_input_size')}>
                            <span>Hình ảnh tỷ lệ 1:1</span>
                        </div>
                        <ImageUploader
                            inputName="productImages"
                            onImageChange={handleImageChange}
                            quantity={9}
                            text="Thêm hình ảnh"
                            flex
                        />
                    </div>
                </div>
                <div className={cx('product_add_info_')}>
                    <div className={cx('product_add_info_field')}>
                        <span>* </span>
                        <span>Ảnh bìa</span>
                    </div>
                    <div className={cx('product_add_info_field_input_back_img')}>
                        <ImageUploader
                            inputName="productBackGroundImage"
                            onImageChange={handleImageChange}
                            quantity={1}
                        />

                        <ul className={cx('product_add_info_field_input_back_img_descript')}>
                            <li>Tải lên hình ảnh 1:1.</li>
                            <li>
                                Ảnh bìa sẽ được hiển thị tại các trang Kết quả tìm kiếm, Gợi ý hôm nay,... Việc sử dụng
                                ảnh bìa đẹp sẽ thu hút thêm lượt truy cập vào sản phẩm của bạn
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('product_add_info_')}>
                    <div className={cx('product_add_info_field')}>
                        <span>* </span>
                        <span>Tên sản phẩm</span>
                    </div>
                    <div className={cx('product_add_info_field_input_name_product_wrap')}>
                        <input
                            name="productName"
                            onChange={handleChange}
                            type="text"
                            placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật"
                            className={cx('product_add_info_field_input_name_product')}
                        />
                    </div>
                </div>
                <div className={cx('product_add_info_')}>
                    <div className={cx('product_add_info_field')}>
                        <span>* </span>
                        <span>Mô tả sản phẩm</span>
                    </div>
                    <div className={cx('product_add_info_field_input_describe_product_wrap')}>
                        <textarea
                            name="productDescription"
                            onChange={handleChange}
                            type="text"
                            className={cx('product_add_info_field_input_describe_product')}
                        />
                    </div>
                </div>
            </div>

            <div className={cx('product_add_info')}>
                <div className={cx('product_add_info_header')}>Thông tin bán hàng</div>
                {/* <div className={cx('product_add_info_')}>
                    <div className={cx('product_add_info_field')}>
                        <span>* </span>
                        <span>Phân loại hàng</span>
                    </div>
                    <div>
                        <Button size_auto dashed_border>
                            <FontAwesomeIcon icon={faPlus} className={cx('plus_icon')} />
                            Thêm nhóm phân loại
                        </Button>
                    </div>
                </div> */}

                <div className={cx('product_add_info_')}>
                    <div className={cx('product_add_info_field')}>
                        <span>* </span>
                        <span>Giá</span>
                    </div>
                    <div className={cx('product_add_info_field_input_price_wrap')}>
                        <span>₫</span>
                        <input
                            name="productPrice"
                            onChange={handleChange}
                            type="text"
                            placeholder="Giá sản phẩm"
                            className={cx('product_add_info_field_input_price')}
                        />
                    </div>
                </div>

                <div className={cx('product_add_info_')}>
                    <div className={cx('product_add_info_field')}>
                        <span>* </span>
                        <span>Kho hàng</span>
                    </div>
                    <div className={cx('product_add_info_field_input_price_wrap')}>
                        <input
                            name="productStock"
                            onChange={handleChange}
                            type="text"
                            className={cx('product_add_info_field_input_price')}
                        />
                    </div>
                </div>

                <div className={cx('product_add_info_')}>
                    <div className={cx('product_add_info_field')}>
                        <span>* </span>
                        <span>Khoảng giá</span>
                    </div>

                    <div className={cx('price_range_wrap')}>
                        <PriceRange onPriceRangeChange={handlePriceRangeChange} />
                    </div>
                </div>
            </div>

            <div className={cx('product_add_info')}>
                <div className={cx('product_add_info_header')}>Thông tin khác</div>

                <div className={cx('product_add_info_')}>
                    <div className={cx('product_add_info_field')}>
                        <span>* </span>
                        <span>SKU sản phẩm</span>
                    </div>
                    <div className={cx('product_add_info_field_input_price_wrap')}>
                        <input
                            name="productSKU"
                            onChange={handleChange}
                            type="text"
                            placeholder=""
                            className={cx('product_add_info_field_input_price')}
                        />
                    </div>
                </div>
            </div>

            <div className={cx('product_add_save')}>
                <Button text quite_small className={cx('product_add_save_btn')}>
                    Hủy
                </Button>
                <Button text quite_small className={cx('product_add_save_btn')}>
                    Lưu & Ẩn
                </Button>
                <Button type="submit" primary quite_small className={cx('product_add_save_btn')}>
                    Lưu & Hiển thị
                </Button>
            </div>
        </form>
    );
}

export default ProductAddition;
