<template>
    <div class="shoplist_container" >
		<ul>
	        <router-link :to="{path:'goodlists',query:{id:item.id}}" v-for="item in shopListArr" tag='li' :key="item.id" class="shop_li">
				<section>
					<img :src=" item.image_path" class="shop_img">
				</section>

				<hgroup class="shop_right">
					<header class="shop_detail_header">
						<h4 :class="item.is_premium? 'premium': ''"  class="shop_title ellipsis">{{item.name}}</h4>
						<ul class="shop_detail_ul">
							<li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
						</ul>
					</header>

					<h5 class="rating_order_num">
						<section class="rating_order_num_left">
							<section class="rating_section">
								<rating-star :rating='item.rating'></rating-star>
								<span class="rating_num">{{item.rating}}</span>
							</section>
							<section class="order_section">
								月售{{item.recent_order_num}}单
							</section>
						</section>
	

					<section class="rating_order_num_right">
							<span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
						</section>
					</h5>
	

				<h5 class="fee_distance">
						<p class="fee">
							¥{{item.float_minimum_order_amount}}起送
							<span class="segmentation">/</span>
							{{item.piecewise_agent_fee.tips}}
						</p>
	

					<p class="distance_time">
							<span v-if="Number(item.distance)">{{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
								<span class="segmentation">/</span>
							</span>
							<span v-else>{{item.distance}}</span>
							<span class="segmentation">/</span>
							<span class="order_time">{{item.order_lead_time}}</span>
						</p>

					</h5>
				</hgroup>
			</router-link> 
		</ul> 
	</div>
</template>

<script>

import RatingStar from '@/components/ratingStar.vue'


export default {
	props:['shopListArr'],
    components:{
        RatingStar
    },
	watch:{
        shopListArr:{
         handler(n,o){ 
	         console.log("this.shopListArr");
             console.log(this.shopListArr);
         },
         deep:true,
         immediate:true,
        }
    }
}
</script>

<style lang="less" scoped>
	@import '~@/style/mixin.less';
	.shoplist_container{
		background-color: #fff;
		margin: 0 0.05rem;
	}
	.shop_li{
		display: flex;
		border-bottom: 0.005rem solid #f1f1f1;
		padding: 0.15rem 0.1rem;
	}
	.shop_img{
		.wh(1.5rem, 1.5rem);
		display: block;
		margin-right: 0.08rem;
	}
	.list_back_li{
        width: 100%;
		height: 2rem;
		.list_back_svg{
			.wh(100%, 100%)
		}
	}
	.shop_right{
		flex: auto;
		.shop_detail_header{
			.fj;
			align-items: center;
			.shop_title{
				width: 2.65rem;
                color: #333;
                margin: 0.1rem 0.15rem;
                padding-top: .01rem;
                text-align: left;
				.font(0.25rem, 0.25rem, 'PingFangSC-Regular');
				font-weight: 700;
			}
			.premium::before{
				content: '品牌';
				display: inline-block;
				font-size: 0.1rem;
				line-height: .12rem;
				color: #333;
				background-color: #ffd930;
				padding: 0 0.02rem;
				border-radius: 0.02rem;
				margin-right: 0.04rem;
			}
			.shop_detail_ul{
				display: flex;
				transform: scale(.8);
				margin-right: -0.06rem;
				.supports{
					.sc(0.1rem, #999);
					border: 0.005rem solid #f1f1f1;
					padding: 0 0.008rem;
					border-radius: 0.016rem;
					margin-left: 0.01rem;
				}
			}
		}
		.rating_order_num{
			.fj(space-between);
			height: 0.12rem;
            margin-top: 0.10rem;
            padding-left: 0.15rem;
			.rating_order_num_left{
				.fj(flex-start);
				.rating_section{
					display: flex;
					.rating_num{
						.sc(0.08rem, #ff6000);
						margin: 0 0.04rem;
					}
				}
				.order_section{
					transform: scale(.8);
					margin-left:0.4rem;
					.sc(0.08rem, #666);
				}
			}
			.rating_order_num_right{
				display: flex;
				align-items: center;
				transform: scale(.7);
				min-width: 1rem;
				justify-content: flex-end;
				margin-right: -0.016rem;
				.delivery_style{
					font-size: 0.08rem;
					padding: 0.008rem 0.016rem 0;
					border-radius: 0.016rem;
					margin-left: 0.016rem;
					border: 1px;
				}
				.delivery_left{
					color: #fff;
					background-color: @blue;
					border: 0.005rem solid @blue;
				}
				.delivery_right{
					color: @blue;
					border: 0.005rem solid @blue;
				}
			}
		}
		.fee_distance{
			margin-top: 0.10rem;
			.fj;
			.sc(0.1rem, #333);
			.fee{
				transform: scale(.9);
				.sc(0.1rem, #666);
			}
			.distance_time{
				transform: scale(.9);
				span{
					color: #999;
				}
				.order_time{
					color: @blue;
				}
				.segmentation{
					color: #ccc;
				}
			}
		}
	}
	.loader_more{
		.font(0.12rem, 3);
		text-align: center;
	    color: #999;
	}
	.empty_data{
		.sc(0.1rem, #666);
		text-align: center;
		line-height: 2rem;
	}
	.return_top{
		position: fixed;
		bottom: 0.5rem;
		right: 0.4rem;
		.back_top_svg{
			.wh(0.4rem, 0.4rem);
		}
	}
	.loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}
</style>