<?php
namespace Magento\Sales\Model\Order\Payment\Transaction;

/**
 * Interceptor class for @see \Magento\Sales\Model\Order\Payment\Transaction
 */
class Interceptor extends \Magento\Sales\Model\Order\Payment\Transaction implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\Model\Context $context, \Magento\Framework\Registry $registry, \Magento\Framework\Api\ExtensionAttributesFactory $extensionFactory, \Magento\Framework\Api\AttributeValueFactory $customAttributeFactory, \Magento\Sales\Model\OrderFactory $orderFactory, \Magento\Sales\Api\OrderPaymentRepositoryInterface $orderPaymentRepository, \Magento\Sales\Api\OrderRepositoryInterface $orderRepository, \Magento\Framework\Stdlib\DateTime\DateTimeFactory $dateFactory, \Magento\Sales\Model\Order\Payment\TransactionFactory $transactionFactory, \Magento\Framework\Model\ResourceModel\AbstractResource $resource = null, \Magento\Framework\Data\Collection\AbstractDb $resourceCollection = null, array $data = array())
    {
        $this->___init();
        parent::__construct($context, $registry, $extensionFactory, $customAttributeFactory, $orderFactory, $orderPaymentRepository, $orderRepository, $dateFactory, $transactionFactory, $resource, $resourceCollection, $data);
    }

    /**
     * {@inheritdoc}
     */
    public function save()
    {
        $pluginInfo = $this->pluginList->getNext($this->subjectType, 'save');
        if (!$pluginInfo) {
            return parent::save();
        } else {
            return $this->___callPlugins('save', func_get_args(), $pluginInfo);
        }
    }
}
