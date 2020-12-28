package com.bgs.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LayuiUtil<T> {
    private Integer code=0;
    private String msg;
    private Integer count;
    private T  data;


}
