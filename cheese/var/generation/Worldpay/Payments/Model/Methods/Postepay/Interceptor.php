<?php
namespace Worldpay\Payments\Model\Methods\Postepay;

/**
 * Interceptor class for @see \Worldpay\Payments\Model\Methods\Postepay
 */
class Interceptor extends \Worldpay\Payments\Model\Methods\Postepay implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\Model\Context $context, \Magento\Framework\Registry $registry, \Magento\Framework\Api\ExtensionAttributesFactory $extensionFactory, \Magento\Framework\Api\AttributeValueFactory $customAttributeFactory, \Magento\Payment\Helper\Data $paymentData, \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig, \Magento\Payment\Model\Method\Logger $logger, \Magento\Backend\Model\Auth\Session $backendAuthSession, \Worldpay\Payments\Model\Config $config, \Magento\Checkout\Model\Cart $cart, \Magento\Framework\UrlInterface $urlBuilder, \Magento\Framework\ObjectManagerInterface $objectManager, \Magento\Sales\Model\Order\Email\Sender\InvoiceSender $invoiceSender, \Magento\Framework\DB\TransactionFactory $transactionFactory, \Magento\Customer\Model\Session $customerSession, \Worldpay\Payments\Model\Resource\SavedCard\CollectionFactory $savedCardFactory, \Magento\Checkout\Model\Session $checkoutSession, \Magento\Checkout\Helper\Data $checkoutData, \Magento\Quote\Api\CartRepositoryInterface $quoteRepository, \Magento\Quote\Api\CartManagementInterface $quoteManagement, \Magento\Sales\Model\Order\Email\Sender\OrderSender $orderSender, \Magento\Backend\Model\Session\Quote $sessionQuote, \Worldpay\Payments\Logger\Logger $wpLogger, \Magento\Framework\Model\ResourceModel\AbstractResource $resource = null, \Magento\Framework\Data\Collection\AbstractDb $resourceCollection = null, array $data = array())
    {
        $this->___init();
        parent::__construct($context, $registry, $extensionFactory, $customAttributeFactory, $paymentData, $scopeConfig, $logger, $backendAuthSession, $config, $cart, $urlBuilder, $objectManager, $invoiceSender, $transactionFactory, $customerSession, $savedCardFactory, $checkoutSession, $checkoutData, $quoteRepository, $quoteManagement, $orderSender, $sessionQuote, $wpLogger, $resource, $resourceCollection, $data);
    }

    /**
     * {@inheritdoc}
     */
    public function getOrderPlaceRedirectUrl()
    {
        $pluginInfo = $this->pluginList->getNext($this->subjectType, 'getOrderPlaceRedirectUrl');
        if (!$pluginInfo) {
            return parent::getOrderPlaceRedirectUrl();
        } else {
            return $this->___callPlugins('getOrderPlaceRedirectUrl', func_get_args(), $pluginInfo);
        }
    }
}
