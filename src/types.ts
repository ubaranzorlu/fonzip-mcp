/** Uretilen operasyon tanimlarinin ve calisma zamaninin ortak tipleri. */

/** MCP istemcilerine gonderilen sadelestirilmis JSON Schema dugumu. */
export interface JsonSchemaNode {
  type?: string | string[];
  enum?: unknown[];
  const?: unknown;
  default?: unknown;
  description?: string;
  format?: string;
  items?: JsonSchemaNode;
  properties?: Record<string, JsonSchemaNode>;
  required?: string[];
  additionalProperties?: boolean | JsonSchemaNode;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  minItems?: number;
  maxItems?: number;
  pattern?: string;
  oneOf?: JsonSchemaNode[];
  anyOf?: JsonSchemaNode[];
}

/** Bir parametrenin istekte nereye yerlesecegi. */
export type ParamLocation = "path" | "query" | "body";

export interface OperationParam {
  name: string;
  in: ParamLocation;
  required: boolean;
  /**
   * Spec'te zorunlu ama varsayilani olan parametrelerde dolu gelir.
   * Cagiran deger gondermezse istek kurulurken bu deger kullanilir.
   */
  defaultValue?: unknown;
  schema: JsonSchemaNode;
}

/** Tek bir Fonzip API operasyonu; bir tool'un bir "action" degeri. */
export interface Operation {
  /** Tool'un action enum'undaki deger. */
  action: string;
  /** OpenAPI operationId. Hata mesajlarinda ve loglarda kullanilir. */
  operationId: string;
  method: string;
  /** Sablon path, ornegin /user/{user_id}. */
  path: string;
  summary?: string;
  params: OperationParam[];
  bodyContentType?: string;
  bodyRequired: boolean;
}

/** Tek bir MCP tool altinda gruplanan operasyonlar. */
export interface ToolGroup {
  name: string;
  description: string;
  /** Grubun tamami GET ise true; MCP readOnlyHint icin kullanilir. */
  readOnly: boolean;
  actions: Operation[];
}
