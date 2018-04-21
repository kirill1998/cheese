<?php
namespace Magento\Checkout\Api\Data;

/**
 * Extension class for @see \Magento\Checkout\Api\Data\ShippingInformationInterface
 */
class ShippingInformationExtension extends \Magento\Framework\Api\AbstractSimpleObject implements \Magento\Checkout\Api\Data\ShippingInformationExtensionInterface
{
    /**
     * @return string|null
     */
    public function getDeliveryDate()
    {
        return $this->_get('delivery_date');
    }

    /**
     * @param string $deliveryDate
     * @return $this
     */
    public function setDeliveryDate($deliveryDate)
    {
        $this->setData('delivery_date', $deliveryDate);
        return $this;
    }

    /**
     * @return string|null
     */
    public function getCustomerRef()
    {
        return $this->_get('customer_ref');
    }

    /**
     * @param string $customerRef
     * @return $this
     */
    public function setCustomerRef($customerRef)
    {
        $this->setData('customer_ref', $customerRef);
        return $this;
    }
}
