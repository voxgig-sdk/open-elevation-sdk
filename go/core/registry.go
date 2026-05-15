package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewLookupEntityFunc func(client *OpenElevationSDK, entopts map[string]any) OpenElevationEntity

