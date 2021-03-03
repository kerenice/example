const CryptoJs = require("crypto-js");
const btoa = require("btoa");

/**
 * JAVA 에서 사용하는 StringCryptoConverter 클래스를 Javascript 에서 사용할수 있게 구현
 *
 * @type {module.StringCryptConverter}
 */
module.exports = class StringCryptConverter {
  constructor() {
    // 초기세팅
    this.mode = CryptoJs.mode.ECB;
    this.padding = CryptoJs.pad.Pkcs7;
    this.enc = CryptoJs.enc.Utf8;
    this.key = btoa("snack24KEY012345");
  }

  /**
   * private function
   * 내부적으로 사용하는 암호화 함수
   *
   * @param plainText
   * @returns {string}
   */
  #doEncrypt(plainText){
    let encrypted;
    try{
      let cipher = CryptoJs.AES.encrypt(plainText, CryptoJs.enc.Base64.parse(this.key), {
        mode: this.mode,
      });
      encrypted = cipher.toString();
    } catch (e){
      console.log(e);
    }
    return encrypted;
  }

  /**
   *
   * StringCryptoConverter 에서 사용하는 암호화 method 를
   * 직관적으로 사용하기 위한 함수
   *
   * @param plainText
   * @returns {*}
   */
  encrypt(plainText) {
    return this.#doEncrypt(plainText);
  }

  /**
   * StringCryptoConverter 에서 사용하는 암호화 method
   *
   * @param plainText
   * @returns {*}
   */
  convertToDatabaseColumn(plainText) {
    return this.#doEncrypt(plainText);
  }

  /**
   * private function
   * 내부적으로 사용하는 복호화 함
   *
   * @param encrypted
   * @returns {string}
   */
  #doDecrypt(encrypted){
    let decrypted;
    try {
      let cipher = CryptoJs.AES.decrypt(encrypted, CryptoJs.enc.Base64.parse(this.key), {
        mode: this.mode,
        padding: this.padding
      });
      decrypted = cipher.toString(this.enc);
    } catch (e) {
      console.log(e);
    }
    return decrypted;
  }

  /**
   * StringCryptoConverter 에서 사용하는 복호화 method 를
   * 직관적으로 사용하기 위한 함수
   *
   * @param encrypted
   * @returns {string}
   */
  decrypt(encrypted){
    return this.#doDecrypt(encrypted);
  }

  /**
   * StringCryptoConverter 에서 사용하는 복호화 method
   *
   * @param encrypted
   * @returns {*}
   */
  convertToEntityAttribute(encrypted) {
    return this.#doDecrypt(encrypted);
  }
};