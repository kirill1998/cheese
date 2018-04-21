<?php
namespace Magento\Quote\Api\Data;

/**
 * Extension class for @see \Magento\Quote\Api\Data\TotalsInterface
 */
class TotalsExtension extends \Magento\Framework\Api\AbstractSimpleObject implements \Magento\Quote\Api\Data\TotalsExtensionInterface
{
    /**
     * @return double|null
     */
    public function getSurcharge()
    {
        return $this->_get('surcharge');
    }

    /**
     * @param double $surcharge
     * @return $this
     */
    public function setSurcharge($surcharge)
    {
        $this->setData('surcharge', $surcharge);
        return $this;
    }

    /**
     * @return array|null
     */
    public function getAdjustments()
    {
        return $this->_get('adjustments');
    }

    /**
     * @param array $adjustments
     * @return $this
     */
    public function setAdjustments(array $adjustments)
    {
        $this->setData('adjustments', $adjustments);
        return $this;
    }

    /**
     * @return double|null
     */
    public function getVat()
    {
        return $this->_get('vat');
    }

    /**
     * @param double $vat
     * @return $this
     */
    public function setVat($vat)
    {
        $this->setData('vat', $vat);
        return $this;
    }
}
