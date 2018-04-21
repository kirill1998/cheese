<?php
namespace Magento\Quote\Api\Data;

/**
 * ExtensionInterface class for @see \Magento\Quote\Api\Data\TotalsInterface
 */
interface TotalsExtensionInterface extends \Magento\Framework\Api\ExtensionAttributesInterface
{
    /**
     * @return double|null
     */
    public function getSurcharge();

    /**
     * @param double $surcharge
     * @return $this
     */
    public function setSurcharge($surcharge);

    /**
     * @return array|null
     */
    public function getAdjustments();

    /**
     * @param array $adjustments
     * @return $this
     */
    public function setAdjustments(array $adjustments);

    /**
     * @return double|null
     */
    public function getVat();

    /**
     * @param double $vat
     * @return $this
     */
    public function setVat($vat);
}
