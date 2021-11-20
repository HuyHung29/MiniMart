import React from "react";
import PropTypes from "prop-types";
import { images } from "constant/index";
import { Button } from "reactstrap";

Cart.propTypes = {
	product: PropTypes.object,
};

function Cart(props) {
	return (
		<div className='cart'>
			<div className='cart__group'>
				<div
					className='cart__button'
					style={{ backgroundImage: `url(${images.BG_SEARCH})` }}>
					<i className='fas fa-shopping-bag'></i>
					<p>
						GIỎ HÀNG <span className='cart__quantity'>(0)</span>
					</p>
				</div>

				<div className='cart__group__menu'>
					{/* <p>Không có sản phẩm nào</p> */}
					<ul className='cart__list'>
						<li className='cart__item'>
							<div className='cart__item__img'>
								<img src={images.PRODUCT} alt='anh' />
							</div>
							<div className='cart__item__info'>
								<div className='cart__item__info--wrap'>
									<h3 className='cart__item__name'>Táo mỹ</h3>
									<p className='cart__item__price'>
										300.000 <small>đ/kg</small>
									</p>
									<p className='cart__item__quantity'>
										Số lượng: 1
									</p>
								</div>
								<div className='cart__item__action'>
									<i className='fas fa-trash-alt'></i>
								</div>
							</div>
						</li>
						<li className='cart__item'>
							<div className='cart__item__img'>
								<img src={images.PRODUCT} alt='anh' />
							</div>
							<div className='cart__item__info'>
								<div className='cart__item__info--wrap'>
									<h3 className='cart__item__name'>Táo mỹ</h3>
									<p className='cart__item__price'>
										300.000 <small>đ/kg</small>
									</p>
									<p className='cart__item__quantity'>
										Số lượng: 1
									</p>
								</div>
								<div className='cart__item__action'>
									<i className='fas fa-trash-alt'></i>
								</div>
							</div>
						</li>
						<li className='cart__item'>
							<div className='cart__item__img'>
								<img src={images.PRODUCT} alt='anh' />
							</div>
							<div className='cart__item__info'>
								<div className='cart__item__info--wrap'>
									<h3 className='cart__item__name'>Táo mỹ</h3>
									<p className='cart__item__price'>
										300.000 <small>đ/kg</small>
									</p>
									<p className='cart__item__quantity'>
										Số lượng: 1
									</p>
								</div>
								<div className='cart__item__action'>
									<i className='fas fa-trash-alt'></i>
								</div>
							</div>
						</li>
					</ul>

					<div className='cart__bottom'>
						<div className='cart__total-price'>
							<p>Tổng tiền</p>
							<span>
								1.400.000<small>đ</small>
							</span>
						</div>

						<Button block className='cart__pay'>
							Tiến hành đặt hàng
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cart;
